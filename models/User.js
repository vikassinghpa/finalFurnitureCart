const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true,
  },
  lastName:{
    type:String,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phoneNumber:{
    type:Number,
    required:true,
    minlength:10,
    maxlength:10,
  },
  role:{
    type:String,
    required:true
  },
  wishList:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }],
  address:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address"
  }],
  cart:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Cart"
  }]
},{timestamps:true})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema)
module.exports = User












