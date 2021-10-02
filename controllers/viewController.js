exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.home = (req, res, next) => {
  res.status(200).render('home', {
    title: 'Home',
  });
};
