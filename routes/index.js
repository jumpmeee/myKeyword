var express = require('express');
var router = express.Router();
var session = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/check', function(req, res, next) {
  console.log(req.body);
  console.log("------------------------");
  session = req.body.uname;
  res.render('check', {email: session, linkUserId: null });
});

router.post('/result', function(req, res, next) {
  
  res.render('result', {email: session});
  console.log(req.body);
  console.log("------------------------");
  var uname = req.body.uname;
  res.render('check', {email: uname, linkUserId: null });
});

router.get('/otherscheck/:id', (req, res, next) => {
  console.log('===============others check');
  res.render('check', {linkUserId: req.params.id});
}) 
//test 링크는 일단 localhost:3000/otherscheck/:id
// _id 값으로 링크 만들면 될듯. 

module.exports = router;
