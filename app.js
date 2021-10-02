const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/userRoutes');
const viewRoute = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');

const app = express();

//Body Parser
app.use(express.json());
//Cookie Parse
app.use(cookieParser());

app.use(morgan('dev'));

//Serving Static Files
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRoute);
//View Routing
app.use('/', viewRoute);
app.all('*', (req, res, next) => {
  next(new AppError(`Could not find the url : ${req.originalUrl}`, 404));
});

app.use(globalError);

module.exports = app;
