const express = require('express');
const User = require('../models/User');
const Address = require('../models/Address');
const {isLoggedIn} = require('../middleware');
const router = express.Router();

router.get('/user',isLoggedIn , async(req,res)=>{
try{
let userId = req.user._id;
let user = await User.findById(userId);
res.render('user/user',{user})
}
catch(e){
  res.status(500).render('error',{error:e.message})
}
})







module.exports = router;