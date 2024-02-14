const mongoose =require("mongoose")
const {Schems} =require('mongoose')

const productSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
  },
  frontImg:{
    type:String,
    required:true,
  },
  backImg:[{
    type:String,
  }],
  price:{
    type:Number,
    required:true,
    min:0,
  },
about:{
    type:String,
    trim:true,
  },
type:{
    type:String,
    required:true,
  },
category:{
    type:String,
    required:true,
  },
  myCollection:{
    type:String,
    required:true,
  },
author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review'
  }],
  numOfReview:{
    type:Number,
    min:0
  }
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product;

















