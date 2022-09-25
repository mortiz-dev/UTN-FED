var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var pool = require('./models/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Select

pool.query("SELECT * FROM empleados").then(function(resultados){
    console.log(resultados);
});

// Insert

//var obj = {
//    nombre: "Juan",
//    apellido: "Perez",
//    trabajo: "Programador",
//    edad: 25,
//    salario: 10000,
//    mail: "juan@programador.com"
//}

//pool.query("INSERT INTO empleados SET ?", [obj]).then(function(resultados){
//   console.log(resultados);
//});

// Update

//var obj = {
//    nombre: "Juan",
//    apellido: "Perez",
//    trabajo: "Programador",
//    edad: 25,
//    salario: 10000,
//    mail: "juanperez@programador.com"
//}

//pool.query("UPDATE empleados SET ? WHERE id = 22", obj).then(function(resultados){
//    console.log(resultados);
//});

// Delete

//pool.query("DELETE FROM empleados WHERE id = 22").then(function(resultados){

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
