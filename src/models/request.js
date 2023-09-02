const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:Number,
    required:true
  },
  timestamp:{
    type:Number,
    required:true
  }
})

module.exports = mongoose.model('Request', requestSchema)