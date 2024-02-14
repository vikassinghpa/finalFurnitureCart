const express = require('express');
const User = require('../models/User');
const Address = require('../models/Address');
const {isLoggedIn} = require('../middleware');
const router = express.Router();

//add address form
router.get('/user/:id/address',isLoggedIn ,(req,res)=>{
  try{
    res.render('user/address')
  }
  catch(e){
    res.status(500).render('error',{error:e.message})
  }
})

//actually add address
router.post('/user/:id',isLoggedIn,async(req,res)=>{
try{
let userId = req.user._id;
let user = await User.findById(userId);
let {houseNumber,street,landMark,district,city,pincode} = req.body;
let newAddress = new Address({houseNumber,street,landMark,district,city,pincode});
await user.address.push(newAddress);
await newAddress.save();
await user.save();
req.flash('success',`Your address added successfully. ${user.firstName}!`)
res.redirect('/products')
}
catch(e){
  res.status(500).render('error',{error:e.message})
}
})

// show the address of user


module.exports = router;