const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const addressSchema = new mongoose.Schema({
houseNumber:{
  type:String,
  required:true,
  trim:true,
},
street:{
  type:String,
  required:true,
  trim:true,
},
landMark:{
  type:String,
  required:true,
  trim:true
},
district:{
  type:String,
  required:true,
  trim:true
},
city:{
  type:String,
  required:true,
  trim:true
},
pincode:{
  type:Number,
  required:true,
  minlength:6,
  maxlength:6,
}
})

const Address = mongoose.model('Address',addressSchema)


module.exports = Address;