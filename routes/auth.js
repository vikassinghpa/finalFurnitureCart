const express =require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

//sign up form
router.get('/register',(req,res)=>{
  try{
    res.render('auth/signup')
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

// register new user
router.post('/register',async(req,res)=>{
try{
 let {firstName,lastName,phoneNumber,username,email,role,password} = req.body;
//  console.log(role) 
 let user = new User({firstName, lastName, phoneNumber,username,email,role});
 let newUser = await User.register(user,password);
 req.flash('success',`${user.firstName}! You are successfully registered.`)
 res.redirect('/login');
}
catch(e){
  res.status(500).render('error',{error:e.message});
}
})

//login page
router.get('/login',(req,res)=>{
  try{
 res.render('auth/login')
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//logged in page
router.post('/login',passport.authenticate('local',{
  failureRedirect:'/login',
  failureMessage:true
}),async(req,res)=>{
  try{
    // console.log(req.user)
    req.flash('success',`Welcome to Furniture Cart ${req.user.firstName.toUpperCase()}.`)
  res.redirect('/products')
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//logout from page
router.get('/logout',(req,res)=>{
  req.logOut(()=>{
    req.flash('success',`Thank you for visiting our Furniture Cart.`)
  res.redirect('/login')
  })
})

module.exports = router;
