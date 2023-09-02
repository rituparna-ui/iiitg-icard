const oauth2Client = require('../utils/oauth/client');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const Request = require('./../models/request');
const { JWT_SECRET } = require('../utils/constants');
const mailer = require('./../utils/mailer');

exports.getLogin = asyncHandler(async (req, res, next) => {
  res.render('auth/login', {
    errors: [],
    email:''
  });
});

exports.postLogout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  return res.redirect('/');
});

exports.getGoogle = asyncHandler(async (req, res, next) => {
  // const { code } = req.query;
  // if (!code) {
  //   return res.redirect('/login');
  // }
  // const { tokens } = await oauth2Client.getToken(code);
  // const payload = jwt.decode(tokens.id_token);
  // const email = payload.email;
  // if (!email.endsWith('iiitg.ac.in')) {
  //   return res.render('auth/login', {
  //     errors: ['Please login using Institute Email'],
  //   });
  // }
});


exports.postRequestOtp = asyncHandler(async (req, res, next)=>{
  const email = req.body.email
  const exists = await Request.findOne({email, timestamp:{$gt:Date.now()-60*10*1000}});
  if(!exists){
    const otp = Math.floor(100000 + Math.random() * 900000);
    const kek = await Request.deleteMany({email});
    await Request.create({
      email,
      otp,
      timestamp:Date.now()
    })
    await mailer(email, 'I-Card Portal Login OTP',
`<h3>Hello ${email}</h3>
<h4>Your OTP is ${otp}</h4>

This is valid only for 5 minutes
`    
    ).catch(()=>{
      return res.render('auth/login',{
        email,
        errors:['There was an error sending OTP']
      })
    })
    return res.render('auth/login',{
      email,
      errors:['OTP Sent Successfully']
    })
  }else{
    return res.render('auth/login',{
      errors: [
        `You have recently requested for OTP ! Please wait for atleast ${Math.ceil(10-((Date.now()-exists.timestamp)/60000))} mins before next OTP request`,
        'You can also enter any previous valid OTP'
      ],
      email
    })
  }
})

exports.postLogin = asyncHandler(async (req, res, next)=>{
  const {email, otp} = req.body;

  const request = await Request.findOne({email, otp});
  if(!request){
    return res.render('auth/login', {
      errors: ['Invalid OTP'],
      email:''
    });
  }

  if(request.timestamp+60*10*1000 < Date.now()){
    return res.render('auth/login', {
      errors: ['Invalid OTP'],
      email:''
    });
  }

  const token = jwt.sign({ email }, JWT_SECRET);
  res.cookie('token', token);
  return res.redirect('/');
})