var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/check', function(req, res, next) {

  var uname = req.body.uname;

  res.render('check', {email: uname});
  console.log(req.body);
  console.log("------------------------");
});

router.get('/otherscheck/:id', (req, res, next) => {
  console.log('===============others check');
  res.render('check', {email: req.params.id});
}) 
//test 링크는 일단 localhost:3000/otherscheck/:id
// _id 값으로 링크 만들면 될듯. 

module.exports = router;
