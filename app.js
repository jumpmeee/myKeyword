require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
//var bodyParser = require('body-parser');//post의 body를 읽기 위해 추가

const app = express();

//Node.js의 native Promise 사용 
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

const user = require('./public/models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')(app, user);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser()); //post의 body를 읽기 위해 추가 하려고 했으나
/* 위에 있는 express.json() express.urlencoded가 body-Parser랑 같은 것을 한다는데...?
express.js의 빌트인 bodyparser라는데...? 그래서 따로 임포트 안해도 된다는데?
https://medium.com/@flsqja12_33844/1%EB%B6%84-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%86%8C%EA%B0%9C-body-parser%EB%A5%BC-%EC%86%8C%EA%B0%9C%ED%95%A9%EB%8B%88%EB%8B%A4-%ED%95%98%EC%A7%80%EB%A7%8C-body-parser%EB%A5%BC-%EC%93%B0%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94-bc3cbe0b2fd
 */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
