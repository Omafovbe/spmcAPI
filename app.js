var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/errHandlers');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pumpRouter = require('./routes/pumps');
require('dotenv/config');

var app = express();

// Database connection here
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`);

// ********************


// ********************

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pump', pumpRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);
/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
