var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/result', function(req, res, next) {
  console.log(req.body.Email + "???");
  console.log(req.body);
  res.render('result', {Email : req.body.Email});
});

module.exports = router;
