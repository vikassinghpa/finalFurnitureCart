const express = require('express');
const router =express.Router();
const Product = require('../models/Product');
const User = require('../models/User')
const Review = require('../models/Review');
const {validateProduct,isLoggedIn ,isSeller ,isProductAuther} = require('../middleware');

// show all products
router.get('/products',async(req,res)=>{
  try{
    let products = await Product.find({});
    res.render('products/index',{products})
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//add new product form
router.get('/products/new',isLoggedIn ,isSeller ,async(req,res)=>{
  try{
   res.render('products/new')
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//actually adding product
router.post('/products',isLoggedIn ,isSeller ,validateProduct ,async(req,res)=>{
  try{
    let {name,frontImg,backImg,price,about,category,type,myCollection} =req.body;
    let product = await Product.create({name,frontImg,backImg,price,about,category,type,myCollection,author:req.user._id});
    req.flash('success',`${product.name} added successfully.`)
    res.redirect('/products');
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//show the particular product
router.get('/products/:id',isLoggedIn ,async(req,res)=>{
  try{
    let {id} = req.params;
    let foundProduct = await Product.findById(id).populate({path:'reviews',populate:{path:'userId'}}).populate('author');
    // console.log(foundProduct.author.firstName)
    let products =await Product.find({$or:[{type:`${foundProduct.type}`},{category:`${foundProduct.category}`},{myCollection:`${foundProduct.myCollection}`}]});
    // let review = await Product.reviews.populate('userId')
    // console.log(foundProduct.reviews.userId.firstName)
    res.render('products/show',{foundProduct,products});
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

// edit in the product form
router.get('/products/:id/edit',isLoggedIn , isSeller
,async(req,res)=>{
  try{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('products/edit',{foundProduct})
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//actually edit product
router.patch('/products/:id', isLoggedIn, isSeller, isProductAuther, validateProduct ,async(req,res)=>{
  try{
  let {id} = req.params;
  let {name,price,category,about,frontImg,backImg,type,myCollection} =req.body;
  let product = await Product.findByIdAndUpdate(id,{name,price,category,about,frontImg,backImg,type,myCollection});
  req.flash('success',`${product.name} edited successfully.`)
  res.redirect(`/products/${id}`);
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//actually delete product
router.delete('/products/:id',isLoggedIn ,isSeller,isProductAuther,async(req,res)=>{
  try{
 let {id} =req.params;
 let product = await Product.findById(id);
 for(let id of product.reviews){
  await Review.findByIdAndDelete(id);
 }
 await Product.findByIdAndDelete(id);
 req.flash('success',`${product.name} deleted successfully.`)
 res.redirect('/products');
  }
  catch(e){
    res.status(500).render('error',{error:e.message});
  }
})

//search input
router.post('/products/search',async(req,res)=>{
  let {searched} = req.body;
  let products = await Product.find({$text:{$search:`${searched}`}});
  res.render('products/index',{products})
})

module.exports = router;