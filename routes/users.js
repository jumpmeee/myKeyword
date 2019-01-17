module.exports = function (app, User) {
  const express = require('express');
  const router = express.Router();

  var arr = new Array("단순한","개척적인","결단력있는","경쟁적인","고집이 있는",
  "공격적인","단호한","도전적인","독립적인","목표를 이루는",
  "성취가 중요한","실행력있는","엄격한","의지가 강한","논쟁하는",
  "주도적인","지도력있는","참을성이 부족한","추진력있는","활동적인",
  "객관적인","계획적인","관례를 따르는","근거가 중요한","꼼꼼한",
  "끈기있는","논리적인","단계적인","분석적인","비판적인",
  "시간이걸리는","신중한","완벽을 추구하는","일관성있는","정확한",
  "조직화하는","체계적인","침착한","한가지에 집중하는","현실감있는",
  "감성적인","낙관적인","대인관계가 넓은","언변이 뛰어난","모임을 즐기는",
  "변덕스러운","변화를 즐기는","사교적인","생기발랄한","설득력있는",
  "쉽게 실증내는","에너지있는","열정적인","유머감각있는","융통성있는",
  "인기있는","적응력이 뛰어난","즐거움을 찾는","충동적인","타인에 민감한",
  "이해가빠른","기획하는","동기유발하는","디테일약한","마무리에 약한",
  "문제를 해결하는","미래지향적인","사색하는","전략적인","생각이 빠른",
  "소신있는","아이디어가 많은","원리를 파악하는","이성적인","창의적인",
  "추상적인","큰 그림을 보는","통찰력있는","혁신적인","호기심많은",
  "겸손한","경청하는","느긋한","대인관계가 원만한","동정심이 많은",
  "불확실이 두려운","성실한","수동적인","수용적인","안정적인",
  "온화한","욕심이 적은","우유부단한","이해심 많은","인내심있는",
  "인심 좋은","절제력있는","팀웍이 좋은","현재에 충실한","협조적인");

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });

  // router.post('/result', function (req, res, next) {

  //   let top3 = sample1;
  //   top3.sort(function (a, b) { return a.cnt < b.cnt ? 1 : a.cnt > b.cnt ? -1 : 0 });

  //   console.log(req.body.Email + "???");
  //   console.log(req.body);
  //   console.log(top3);
  //   console.log("==========================================");

  //   res.render('result', { Email: req.body.Email, top3: top3 });
  // });

  //결과 띄우는 부분.
  router.post('/result', (req, res, next) => {
    /* 자신이 한거에서 result가 오면 chk 결과를 일단. insert 해야겠지.
    insert 할때부터 cnt를 올릴려면 그 keyWord 100개를 어쨌든 같이 up 해줘야하는거잖아
    너무 비효율적인거 같은데,
    체크 된 것들 cnt를 하나씩 올려야해 1로, 
    그 다음에 top3를 띄워줘야하고.
    cnt가 0보다 큰 애들을 표에다가 찍어줘야하고

    update할거면 배열을 갖고 와가지고 그걸 ++해서 해주면되고,


    그러면 일단 keyWord는 빼고 시작해볼까나.
    */

    //여기는 일단, 처음으로 유저가 했을때를 생각하면서 하는거야.

   console.log(req.body.chk);
   console.log(req.body.email);

    let rslt = req.body.chk;
    let user = new User();

    let arr = new Array(100).fill(0);
    for(let i in rslt) {
      arr[i-1]++;
    }

    console.log(arr);

    user.email = req.body.email;
    user.userCh = rslt;
    user.totCnt = arr;

    user.save(function (err) {
      if (err) {
        console.error(err);
        return;
      }

      let data = [];
      //결과를 출력해야하는데, top3는 totCnt를 기준으로 할거니까 user.totCnt를 정렬해서 3개까지만 출력하면 되. 이걸 node에서 어떻게 하게
      for(let i in arr) {
        if(arr[i] > 0) {
          data.push({keyWord: sample1[i].keyWord, cnt: arr[i]});
        }
      }
      data.sort(function (a, b) { return a.cnt < b.cnt ? 1 : a.cnt > b.cnt ? -1 : 0 });
      console.log(data);

      res.render('result', { Email: user.email, data: data });
    });
  });

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
    User.update({ email: req.query.id }, { $set: req.query }, (err, output) => {
      if (err) res.status(500).json({ error: 'db fail' });
      console.log(output);
      if (!output.n) return res.status(404).json({ error: 'user not found' });
      res.json({ message: 'user updated' });
      //{ n: 1, nModified: 0, ok: 1 } nModified는 변경한 document 갯수, n은 select된 document 갯수 기존 내용이 업데이트 할 내용과 같으면 nModified 는 0 으로 되기 때문에, n 값을 비교하여 성공여부를 판단합니다.
    })
  })

  router.get('/delete/:id', (req, res) => {
    User.deleteOne({ email: req.params.id }, (err, output) => {
      if (err) return res.status(500).json({ error: "database failure" });

      res.status(204).end();
    })
  });

  return router;
}

// //create
  // router.get('/result/:id', function (req, res, next) {

  //   console.log(req.params.id);
  //   console.log("===========================");
  //   var user = new User();
  //   user.email = req.params.id;

  //   user.save(function (err) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //   });

  //   res.json({ result: 1 });
  //   //res.render('result', { Email: req.body.Email, top3: top3 });
  // });

  
  // router.get('/result/find/:id', (req, res, next) => {
  //   User.find({ email: req.params.id }, (err, users) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }

  //     res.json(users);
  //   })
  // })
