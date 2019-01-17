const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type:String /*, required: true, unique:true, trim: true */},
    userCh: [Number],
    otherCnt: {type: Number, default: 0},
    others: [{
      name: {type: String, trim: true},
      otherCh: [Number]
    }],
    cnt: []
    // keyWord: [{
    //   no: Number,
    //   description: String,
    //   cnt: {type: Number, default: 0}
    // }]
}, {collection: 'users'});

module.exports = mongoose.model('user', userSchema);