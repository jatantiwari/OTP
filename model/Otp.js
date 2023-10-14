const mongoose = require('mongoose');
// const {User}  = require('../models/User')
// const {Community}  = require('../models/Community')
const OTPSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true, 
  },
  otp:{
    type: String,
    required: true,
  }
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;
