
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayout = require('express-ejs-layouts');
var session = require('express-session');
var cors = require('cors'); // Thêm dòng này

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var dashboardRouter = require('./routes/dashboard');
var mess = require('./routes/mess')
var categoryRouter = require('./routes/category');
var apiRouter = require('./routes/api');
var app = express();

//su kien message



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayout);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // Thêm dòng này

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/api', apiRouter);
app.use('/mes', mess);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // API
  res.status(err.status || 500);

  if (req.originalUrl.indexOf('/api') == 0) {
    res.json({
      status: 0,
      msg: err.message,
    });
  } else {
    res.render('error');
  }
});

module.exports = app;
