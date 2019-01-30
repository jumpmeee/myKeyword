const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type:String , required: true, unique:true, trim: true },
    userCh: [Number],
    otherCnt: {type: Number, default: 0},
    others: [{
      name: {type: String, trim: true},
      otherCh: [Number]
    }],
    totCnt: []
}, {collection: 'users'});

module.exports = mongoose.model('user', userSchema);

/*
var userSchema = new Schema({
    email: {type:String , required: true, unique:true, trim: true }, //사용자의 이메일
    userCh: [Number], // 사용자가 체크한 키워드 배열(해당 키워드의 숫자로 저장)
    otherCnt: {type: Number, default: 0}, //몇명의 타인이 체크해줬는지 확인. (others.length로 대체 가능?)
    others: [{ //타인 정보
      name: {type: String, trim: true}, // 사용자의 키워드를 체크한 타인의 이메일
      otherCh: [Number] // 타인이 체크한 키워드
    }], 
    totCnt: [] //어떤 키워드가 몇번 체크 됐는지 확인.
}, {collection: 'users'}); //콜렉션 이름 지정
*/ 

