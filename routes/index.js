var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/result', function(req, res, next) {
  console.log(req.body.check_info+"sksknfksnfksnfksnfksanflnsalfknaslk");
  res.render('result');
});

router.get('/check', function(req, res, next) {
  res.render('check');
});

module.exports = router;
