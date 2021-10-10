import { getAllMenu } from './menuUtility';
import { loaderDisplay } from './util';

let workData;
let selectionData;
let curCategorySel;

const getTotal = function () {
  let totalAmt = 0;
  selectionData.forEach(function (el) {
    totalAmt += el.total;
  });

  return totalAmt;
};

const renderSummary = function (count, total) {
  const html = `<p>Selected Items : <span class="bill-selection-count">${count}</span></p><p>Selected Price : <span class="bill-selection-price">${total}</span></p>`;

  const menuSummary = document.querySelector('.bill-selection-info__result');
  menuSummary.innerHTML = '';
  menuSummary.insertAdjacentHTML('afterbegin', html);
};

const renderBillMenu = () => {
  const categoryData = workData.filter(function (el) {
    return el.category === curCategorySel;
  });
  const markup = categoryData
    .map(function (el) {
      return `
        <div class="bill-menu-item__wrapper ${
          el.isSelected ? 'menu-checked' : ''
        }" data-id = ${el._id}>
        <div class="bill-menu-item" data-id = ${el._id}>
          <input type="checkbox" class="menu-select" ${
            el.isSelected ? 'checked' : ''
          }/>
          <p class="bill-menu-item__title">${el.item}</p>
          <p class="bill-menu-item__qty">${el.qty}</p>
          <p class="bill-menu-item__amount">${el.price}</p>
      
          <div class="inputQty_wrapper">
            <span>Pcs</span>
      
            <input
              type="number"
              id="menu-item__inputQty"
              class="menu-item__inputQty"
              value = ${el.inputQty}
              ${!el.isSelected ? 'disabled' : ''}
              ${!el.qty ? 'disabled' : ''}
            />
          </div>
      
          <div class="inputPlate_wrapper">
            <span>Plt</span>
            <input
              type="number"
              id="menu-item__inputPlate"
              class="menu-item__inputPlate"
              value = ${el.inputPlt}
              ${!el.isSelected ? 'disabled' : ''}
            />
          </div>
        </div>
        <input
          type="text"
          id="menu-item__total"
          class="menu-item__total"
          value=${el.total}
          disabled="disabled"
        />
      </div>
        `;
    })
    .join('');

  const billMenuContainer = document.querySelector('.bill-menu-items');
  billMenuContainer.innerHTML = '';
  billMenuContainer.insertAdjacentHTML('afterbegin', markup);
};

const setMenuSelection = (id) => {
  let count = 0;
  let total = 0;
  workData.forEach(function (el) {
    if (el._id == id) {
      if (el.isSelected) {
        el.isSelected = false;
        el.inputQty = 0;
        el.inputPlt = 0;
        el.total = 0;
      } else el.isSelected = true;
    }

    if (el.isSelected) {
      count = count + 1;
      total += el.total;
    }
  });

  renderBillMenu();
  renderSummary(count, total);
};

const updatePrice = (value, attribute, id, totalInput) => {
  let total = 0;
  let sCount = 0;
  let sTotal = 0;
  workData.forEach(function (el) {
    if (el._id == id) {
      const price = el.price;
      const qty = el.qty;
      if (attribute === 'qty') {
        total = Math.round((price / qty) * value);
        el.inputQty = value * 1;
      } else {
        total = Math.round(price * value);
        el.inputPlt = value * 1;
      }

      el.total = total;
    }
    totalInput.value = total;
    if (el.isSelected) {
      sCount = sCount + 1;
      sTotal += el.total;
    }
  });

  renderSummary(sCount, sTotal);
};

const updateReviewPrice = function (e) {
  if (e.target.classList.contains('inputReviewAmt')) {
    const id = e.target.parentElement.dataset.id;
    selectionData.forEach(function (el) {
      if (el._id == id) {
        el.total = e.target.value * 1;
      }
    });

    const reviewAmount = document.querySelector('.reviewAmount');
    reviewAmount.innerHTML = `Rs ${getTotal()}`;
  }
};

const renderReview = () => {
  selectionData = workData.filter(function (el) {
    return el.isSelected === true;
  });
  const reviewItems = document.querySelector('.bill-review-price-items');
  const reviewAmount = document.querySelector('.reviewAmount');
  reviewItems.innerHTML = '';
  const markup = selectionData
    .map(function (el) {
      return `
          <div class="bill-review-price-item">
          <p class= ${
            el.inputQty > 0 && el.inputPlt > 0 ? 'review-error' : ''
          }>${el.item} [${el.price}]</p>
          <p class= ${
            el.inputQty > 0 && el.inputPlt > 0 ? 'review-error' : ''
          }>${el.inputQty} Pieces</p>
          <div class="bill-review-price " data-id = ${el._id}>
            <span>Rs</span><input type="number" name="" id="" value="${
              el.total
            }"  class = "inputReviewAmt"/>
          </div>
        </div>
          `;
    })
    .join('');

  reviewItems.insertAdjacentHTML('afterbegin', markup);
  reviewAmount.innerHTML = getTotal();
};

const getCompliment = (e) => {
  if (e.target.checked) {
    const comp = {
      _id: e.target.dataset.id,
      item: e.target.value,
      price: 0,
      qty: 0,
      category: 'complimentary',
      total: 0,
    };

    selectionData.push(comp);
  } else {
    selectionData = selectionData.filter(function (el) {
      return el._id != e.target.dataset.id;
    });
  }
};

const getFinalReciept = () => {
  const finalReceipt = document.querySelector('.bill-final-receipts');
  const html = selectionData
    .map(function (el) {
      return `
          <div class="bill-final-receipt">
              <p class=${el.total === 0 ? 'comp' : ''}>${el.item} </p>
              <p>Rs ${el.total}</p>
            </div>
          `;
    })
    .join('');

  finalReceipt.innerHTML = '';
  finalReceipt.insertAdjacentHTML('afterbegin', html);

  document.querySelector('.bill-final-total').innerHTML = `Rs ${getTotal()}`;
};

const billInit = async () => {
  loaderDisplay();
  const data = await getAllMenu();
  workData = data.map(function (el) {
    return { ...el, isSelected: false, inputQty: 0, inputPlt: 0, total: 0 };
  });
  loaderDisplay();

  //Add All Event Listener
  const billCategory = document.getElementById('bill-category');
  billCategory.addEventListener('change', function (e) {
    curCategorySel = billCategory.value;
    renderBillMenu();
  });

  // Check Box
  const billMenuItems = document.querySelector('.bill-menu-items');
  billMenuItems.addEventListener('change', function (e) {
    if (e.target.classList.contains('menu-select')) {
      const parentElem = e.target.parentElement.parentElement;
      parentElem.classList.toggle('menu-checked');
      setMenuSelection(parentElem.dataset.id);
    }
  });

  //Input
  billMenuItems.addEventListener('input', function (e) {
    if (e.target.classList.contains('menu-item__inputQty')) {
      const input =
        e.target.parentNode.parentNode.parentNode.querySelector(
          '.menu-item__total'
        );
      const parentElem = e.target.parentElement.parentElement;
      updatePrice(e.target.value, 'qty', parentElem.dataset.id, input);
    }

    if (e.target.classList.contains('menu-item__inputPlate')) {
      const input =
        e.target.parentNode.parentNode.parentNode.querySelector(
          '.menu-item__total'
        );
      const parentElem = e.target.parentElement.parentElement;
      updatePrice(e.target.value, 'plate', parentElem.dataset.id, input);
    }
  });

  //Review Button
  const reviewBtn = document.querySelector('.review-cta');
  const reviewPrevBtn = document.querySelector('.review-prev');
  const billCtaContainer = document.querySelector('.bill-container');
  const billReviewContainer = document.querySelector('.bill-review-container');
  const billReviewItems = document.querySelector('.bill-review-price-items');
  const complimentItems = document.querySelector('.bill-compliment-items');
  const reviewNextBtn = document.querySelector('.review-next');
  const receiptContainer = document.querySelector('.bill-receipt-container');
  const recieptPrevBtn = document.querySelector('.receipt-prev');

  //Review Button
  reviewBtn.addEventListener('click', function (e) {
    billCtaContainer.classList.toggle('hidden');
    billReviewContainer.classList.toggle('hidden');
    renderReview();
  });

  //Review Prev Button
  reviewPrevBtn.addEventListener('click', function (e) {
    billCtaContainer.classList.toggle('hidden');
    billReviewContainer.classList.toggle('hidden');
  });

  //Review Input Button
  billReviewItems.addEventListener('input', updateReviewPrice);

  //Complement Checks
  complimentItems.addEventListener('change', getCompliment);

  //Next button Review
  reviewNextBtn.addEventListener('click', function (e) {
    billReviewContainer.classList.toggle('hidden');
    receiptContainer.classList.toggle('hidden');
    getFinalReciept();
  });

  //Prev Button Receipt
  recieptPrevBtn.addEventListener('click', function (e) {
    billReviewContainer.classList.toggle('hidden');
    receiptContainer.classList.toggle('hidden');
  });
};

export { billInit };
