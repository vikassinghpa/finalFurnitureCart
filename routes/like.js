const express = require('express')
const User = require('../models/User');
const router = express.Router();
const {isLoggedIn} = require('../middleware')


router.post('/products/:id/like',isLoggedIn ,async (req,res)=>{
  let {id} = req.params;
  let user = req.user;
  let isLiked = user.wishList.includes(id);
  if(isLiked){
    await User.findByIdAndUpdate(req.user._id,{$pull:{wishList:id}})
  }else{
    await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:id}})
  }
  res.status(201).send('ok');
})

module.exports = router;