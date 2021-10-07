import domtoimage from 'dom-to-image';

import { getMenuByCategory } from './menuUtility';
import { loaderDisplay } from './util';

const getMenuItemMarkup = async (category, index) => {
  const data = await getMenuByCategory(category);
  const html = data
    .map(function (el, i) {
      return `
      ${i === 0 ? `<h1>${category}</h1>` : ''}
      <div class="pm-menu-info">
        <p>${el.item}${el.qty > 0 ? `(${el.qty}pc)` : ''}</p>
        <p>..........${el.price}</p>
      </div>
    
      `;
    })
    .join('');

  return html;
};

const renderMenu = async (categoryList) => {
  loaderDisplay();
  const item1Container = document.querySelector('.pm-menu-item-1');
  const item2Container = document.querySelector('.pm-menu-item-2');
  const item3Container = document.querySelector('.pm-menu-item-3');

  item1Container.innerHTML = '';
  item2Container.innerHTML = '';
  item3Container.innerHTML = '';

  const arrCategory = categoryList.split(',');
  const item1 = await getMenuItemMarkup(arrCategory[0], 1);
  const item2 = await getMenuItemMarkup(arrCategory[1], 2);
  const item3 = await getMenuItemMarkup(arrCategory[2], 3);

  item1Container.insertAdjacentHTML('afterbegin', item1);
  item2Container.insertAdjacentHTML('afterbegin', item2);
  item3Container.insertAdjacentHTML('afterbegin', item3);
  loaderDisplay();
};

const printMenu = () => {
  loaderDisplay();
  var options = {
    quality: 2,
    width: 2000,
    height: 2000,
  };

  const printCategorySelection = document.getElementById('pm-select').value;
  const name = printCategorySelection.replaceAll(',', '-');
  const downlaodNode = document.getElementById('download-menu');
  domtoimage.toPng(downlaodNode, { options }).then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = dataUrl;
    link.click();
    loaderDisplay();
  });
};

export { renderMenu, printMenu };
