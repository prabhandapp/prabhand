const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const userRoute = require('./routes/userRoutes');
const viewRoute = require('./routes/viewRoutes');
const menuRoute = require('./routes/menuRoutes');
const expenseRoute = require('./routes/expenseRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');

const app = express();

//Body Parser
app.use(express.json());
//Cookie Parse
app.use(cookieParser());

app.use(morgan('dev'));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

//Serving Static Files
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/public`));

//API Routing
app.use('/api/v1/users', userRoute);
app.use('/api/v1/menu', menuRoute);
app.use('/api/v1/expense', expenseRoute);
app.use('/api/v1/review', reviewRoute);
//View Routing
app.use('/', viewRoute);
app.all('*', (req, res, next) => {
  next(new AppError(`Could not find the url : ${req.originalUrl}`, 404));
});

app.use(globalError);

module.exports = app;
