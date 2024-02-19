const mongoose =require("mongoose")
const {Schema} =require('mongoose')

const reviewSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  rating:{
    type:Number,
    min:0,
    max:5
  },
  comment:{
    type:String,
    trim:true
  }
},{timestamps:true})

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review;





















