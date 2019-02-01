module.exports = function (app, User) {
  const express = require('express');
  const router = express.Router();

  var sample1 = new Array("단순한", "개척적인", "결단력있는", "경쟁적인", "고집이 있는",
    "공격적인", "단호한", "도전적인", "독립적인", "목표를 이루는",
    "성취가 중요한", "실행력있는", "엄격한", "의지가 강한", "논쟁하는",
    "주도적인", "지도력있는", "참을성이 부족한", "추진력있는", "활동적인",
    "객관적인", "계획적인", "관례를 따르는", "근거가 중요한", "꼼꼼한",
    "끈기있는", "논리적인", "단계적인", "분석적인", "비판적인",
    "시간이걸리는", "신중한", "완벽을 추구하는", "일관성있는", "정확한",
    "조직화하는", "체계적인", "침착한", "한가지에 집중하는", "현실감있는",
    "감성적인", "낙관적인", "대인관계가 넓은", "언변이 뛰어난", "모임을 즐기는",
    "변덕스러운", "변화를 즐기는", "사교적인", "생기발랄한", "설득력있는",
    "쉽게 실증내는", "에너지있는", "열정적인", "유머감각있는", "융통성있는",
    "인기있는", "적응력이 뛰어난", "즐거움을 찾는", "충동적인", "타인에 민감한",
    "이해가빠른", "기획하는", "동기유발하는", "디테일약한", "마무리에 약한",
    "문제를 해결하는", "미래지향적인", "사색하는", "전략적인", "생각이 빠른",
    "소신있는", "아이디어가 많은", "원리를 파악하는", "이성적인", "창의적인",
    "추상적인", "큰 그림을 보는", "통찰력있는", "혁신적인", "호기심많은",
    "겸손한", "경청하는", "느긋한", "대인관계가 원만한", "동정심이 많은",
    "불확실이 두려운", "성실한", "수동적인", "수용적인", "안정적인",
    "온화한", "욕심이 적은", "우유부단한", "이해심 많은", "인내심있는",
    "인심 좋은", "절제력있는", "팀웍이 좋은", "현재에 충실한", "협조적인");

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    res.redirect('/');
  });

  router.post('/indexrslt', (req, res, next) => {
    console.log("====indexrslt");
    let email = req.body.uname;

    //find 해줄까 findOne 해줄까 ㅇㅂㅇ
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!user) return res.status(404); // 못찾았을때, 
      if (user.length == 0) return res.status(404); // 이거 지워도 될듯 

      let data = new Object(); //keyWord(String)랑, cnt(int)가 들어가야함.
      data.keyWords = [];
      data.matchMoOx = [];
      data.matchMxOo = [];
      data.link = "localhost:3000/otherscheck/" + user._id;
      data.KeyMyself=[];

      let chNum = []; // 선택받은 숫자

      for (let i = 0; i < user.totCnt.length; i++) {
        if (user.totCnt[i] > 0) {
          // console.log(i + " " + user.totCnt[i] + " " + sample1[i]);
          chNum.push(i);
          data.keyWords.push({ keyWord: sample1[i], cnt: user.totCnt[i] });
        }
      }
      data.keyWords.sort(function (a, b) { return a.cnt < b.cnt ? 1 : a.cnt > b.cnt ? -1 : 0 }); //top 3 를 위한 정렬
      // console.log("chNum=====");
      // console.log(chNum);
      // console.log(user._id);

      if (!user.otherCnt) {
        data.matchMoOx = null;
        data.matchMxOo = null;
      } else {
        let tot = user.totCnt;
        let uch = user.userCh;

        let matchCnt = 0;
        for (let i = 0; i < user.userCh.length; i++) {
          data.KeyMyself.push({keyWord: sample1[user.userCh[i]-1]});
          let tmp = tot[uch[i] - 1] - 1;
          if (tmp == 0) {
            data.matchMoOx.push({ keyWord: sample1[uch[i] - 1] });
          } else if (tmp > 0) {
            matchCnt++; // 나도하고 남도하고
          }
          // } else if(tmp == 0) {
          //   data.matchMxOo.push({ keyWord: sample1[uch[i]-1], cnt: tmp});

          chNum.splice(chNum.indexOf(user.userCh[i]), 1); //userCh에 있는 숫자를 빼는 것,
        }
        // console.log(data.KeyMyself);
        data.matchPoint = ((matchCnt / uch.length) * 100).toFixed(2); // 12 == userCh.length
        // console.log("MxOo");
        // console.log(chNum);

        //여기가 MxOo 내가 안하고 남이 한거 그래서 cnt 할때 -1 해줄 필요 없음.
        for (let i = 0; i < chNum.length; i++) {
          data.matchMxOo.push({ keyWord: sample1[chNum[i]], cnt: tot[chNum[i]] });
        }
      }

      console.log(data);

      res.render('result', { Email: user.email, data: data });

    })
  });

  router.get('/result', (req, res, next) => {
    res.render('index1', { title: "유효한 접근이 아닙니다." })
  });

  router.post('/result', (req, res, next) => {

    console.log("=======================================insert");

    console.log(req.body.chk);
    console.log(req.body.email);

    let rslt = req.body.chk;
    let user = new User();

    let arr = new Array(100).fill(0);
    for (let i in rslt) {
      arr[rslt[i] - 1]++;
    }

    user.email = req.body.email;
    user.userCh = rslt;
    user.totCnt = arr;
    console.log("user._id" + user._id);

    user.save(function (err) {
      if (err) {
        console.error(err); //여기서 에러 처리 해줘야함. 제대로 들어가지 않았다던지, !!!!!!!!!!!!!!!! 중요!!!!!!!!!!
        return;
      }

      let data = new Object();
      data.keyWords = [];
      data.matchMoOx = null;
      data.matchMxOo = null;
      data.matchPoint = null;
      data.link = "localhost:3000/otherscheck/" + user._id;

      for (let i in arr) {
        if (arr[i] > 0) {
          data.keyWords.push({ keyWord: sample1[i], cnt: arr[i] });
        }
      }
      data.keyWords.sort(function (a, b) { return a.cnt < b.cnt ? 1 : a.cnt > b.cnt ? -1 : 0 });

      // console.log(data);
      // console.log(user.email);
      // console.log(req.body.email);

      res.render('result', { Email: user.email, data: data });

    });
  });

  //필요한게 대상의 email(검색용)/타인email(push용)/

  router.post('/others', function (req, res, next) {
    console.log("----------other check--------------");
    console.log(req.body.chk);
    console.log(req.body.linkUserId); //이걸 userId 로 수정해야함. id로 조회하는거니까
    console.log(req.body.email_oth) //이건 다른 사람 이메일인데 이거 만들어야 붙일듯 

    let chk = req.body.chk;
    let linkUserId = req.body.linkUserId;
    let email_oth = req.body.email_oth;

    User.findOne({ _id: linkUserId }, (err, user) => {
      if (err) return res.status(500).json({ error: 'database failure' });
      if (!user) return res.status(404).json({ error: 'user not found' });

      console.log("i'm      " + user.email);
      console.log(user.others);

      let flag = true;
      let oldChk;
      for (let idx in user.others) {
        if (user.others[idx].name == email_oth) {
          flag = false;
          oldChk = user.others[idx].otherCh;
        }
        if (!flag) break;
      }

      if (flag) {
        console.log("inset others-----------------------------");
        if (email_oth && chk) {
          user.others.push({ name: email_oth, otherCh: chk });
          user.otherCnt = user.otherCnt + 1;

          for (let i in chk) {
            user.totCnt[chk[i] - 1] = user.totCnt[chk[i] - 1] + 1;
          }
        }

        // let temp = user.totCnt;

        User.updateOne({ _id: linkUserId }, { $set: { "totCnt": user.totCnt } }, (err, output) => {
          if (err) res.status(500).json({ error: 'db fail' });
          console.log(output);
          if (!output.n) return res.status(404).json({ error: 'user not found' });
        })

        user.save(function (err) {
          if (err) res.status(500).json({ error: 'failed to update' });
        })
  
      } else {
        console.log("update others-----------------------------")
        console.log("oldchkkkkk");
        console.log(oldChk);
        console.log(oldChk.length);
        console.log("chkkkkkkkkkkkkkkkkk");
        console.log(chk);
        // console.log("temppppppppppppppppp")
        // console.log(user.totCnt);

        for (let i = 0; i < oldChk.length; i++) {
          // console.log(i + " " + (oldChk[i]-1) + " " + user.totCnt[oldChk[i]-1]);

          user.totCnt[oldChk[i] - 1] = user.totCnt[oldChk[i] - 1] - 1;
        }

        // console.log(user.totCnt);

        for(let i in chk) {
          // console.log(i + " " + chk[i] + " " + user.totCnt[chk[i]-1]);
          user.totCnt[chk[i] - 1] = user.totCnt[chk[i] - 1] + 1;
        }

        // console.log(user.totCnt);

        //  let temp = user.totCnt;
         
        User.updateOne({ "_id": linkUserId, "others.name" : email_oth }, { $set: { "totCnt" : user.totCnt ,  "others.$.otherCh" : chk}}, (err, output) => {
          if (err) res.status(500).json({ error: 'db fail' });
          console.log(output);

          if (!output.n) return res.status(404).json({ error: 'user not found' });
        })
      }

      
    })
    res.redirect('/');
  });

  return router;
}