module.exports = function (app, User) {
  const express = require('express');
  const router = express.Router();

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
  router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/result', function (req, res, next) {

    let top3 = sample1;
    top3.sort(function (a, b) { return a.cnt < b.cnt ? 1 : a.cnt > b.cnt ? -1 : 0 });

    console.log(req.body.Email + "???");
    console.log(req.body);
    console.log(top3);
    console.log("==========================================");

    res.render('result', { Email: req.body.Email, top3: top3 });
  });

  //create
  router.get('/result/:id', function (req, res, next) {

    console.log(req.params.id);
    console.log("===========================");
    var user = new User();
    user.email = req.params.id;

    user.save(function (err) {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.json({ result: 1 });
    //res.render('result', { Email: req.body.Email, top3: top3 });
  });

  router.get('/result/find/:id', (req, res, next) => {
    User.find({ email: req.params.id }, (err, users) => {
      if (err) {
        console.error(err);
        return;
      }

      res.json(users);
    })
  })

  router.get('/update', (req, res, next) => {
    console.log(req.query.id);
    console.log(req.query.otherCnt);

    User.findOne({ email: req.query.id }, (err, user) => {
      if (err) return res.status(500).json({ error: 'database failure' });
      if (!user) return res.status(404).json({ error: 'user not found' });

      if (req.query.otherCnt) user.otherCnt = req.query.otherCnt;

      user.save(function (err) {
        if (err) res.status(500).json({ error: 'failed to update' });
        res.json({ message: 'user updated' });
      })
    })
  }) //put으로 변경할 수 있으면 변경할 것, check에서 넘기면서 ajax로 동작하게 하면 될듯.
  //http://127.0.0.1:3000/users/update?id=srs112&otherCnt=1 example

  router.get('/update2', (req, res, next) => {
    User.update({email: req.query.id}, { $set: req.query }, (err, output) => {
      if(err) res.status(500).json({error: 'db fail'});
      console.log(output);
      if(!output.n) return res.status(404).json({error: 'user not found'});
      res.json({message: 'user updated'}); 
      //{ n: 1, nModified: 0, ok: 1 } nModified는 변경한 document 갯수, n은 select된 document 갯수 기존 내용이 업데이트 할 내용과 같으면 nModified 는 0 으로 되기 때문에, n 값을 비교하여 성공여부를 판단합니다.
    })
  })

  router.get('/delete/:id', (req, res) => {
    User.deleteOne({ email: req.params.id }, (err, output) => {
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    })
});

  return router;
}