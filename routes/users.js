var express = require('express');
var router = express.Router();

const sample1 = [
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/result', function(req, res, next) {

  let top3 = sample1;
  top3.sort(function(a, b) { return a.cnt < b.cnt ? 1 : a.cnt > b.cnt ? -1 : 0 });

  console.log(req.body.Email + "???");
  console.log(req.body);
  console.log(top3);
  console.log("==========================================");

  res.render('result', {Email : req.body.Email, top3 : top3});
});

// router.post('/result', function(req, res, next) {
//   let top3 =[];

  
//   for(let i in sample1) {
//     top3.push(sample1[i]);
//   }

//   console.log(top3[0].no);
//   res.render('result', {top3 : 1});
// });


module.exports = router;
