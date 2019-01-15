var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var bodyParser = require('body-parser');//post의 body를 읽기 위해 추가

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

var sample1 = [
  {
    "no": 1,
    "keyWord": "단순한",
    "cnt": 10
  },
  {
    "no": 2,
    "keyWord": "개척적인",
    "cnt": 2
  },
  {
    "no": 3,
    "keyWord": "결단력있는",
    "cnt": 4
  },
  {
    "no": 4,
    "keyWord": "경쟁적인",
    "cnt": 9
  },
  {
    "no": 5,
    "keyWord": "고집이 있는",
    "cnt": 1
  },
  {
    "no": 6,
    "keyWord": "공격적인",
    "cnt": 2
  },
  {
    "no": 7,
    "keyWord": "단호한",
    "cnt": 0
  },
  {
    "no": 8,
    "keyWord": "도전적인",
    "cnt": 7
  },
  {
    "no": 9,
    "keyWord": "독립적인",
    "cnt": 9
  },
  {
    "no": 10,
    "keyWord": "목표를 이루는",
    "cnt": 0
  },
  {
    "no": 11,
    "keyWord": "성취가 중요한",
    "cnt": 0
  },
  {
    "no": 12,
    "keyWord": "실행력있는",
    "cnt": 0
  },
  {
    "no": 13,
    "keyWord": "엄격한",
    "cnt": 0
  },
  {
    "no": 14,
    "keyWord": "의지가 강한",
    "cnt": 0
  },
  {
    "no": 15,
    "keyWord": "논쟁하는",
    "cnt": 0
  }
];

module.exports = app;
