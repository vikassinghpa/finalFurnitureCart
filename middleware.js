const {productSchema ,reviewSchema} = require('./schema');
const Product = require('./models/Product')


const validateProduct = (req,res,next)=>{
let {name,frontImg,backImg,price,about,category,type,myCollection} = req.body;
const {error} = productSchema.validate({name,frontImg,backImg,price,about,category,type,myCollection});

if(error){
  const msg = error.details.map((err)=> err.message).join(',');
  return res.render('error',{error:msg})
}

next();
}

const validateReview = (req,res,next)=>{
  let {rating,comment} =req.body;
  const {error} = reviewSchema.validate({rating,comment});

  if(error){
    const msg = error.details.map((err)=> err.message).join(',');
    return res.render('error',{error:msg})
  }

next();
}

const isLoggedIn = (req,res,next)=>{
if(req.xhr && !req.isAuthenticated()){

  return res.status(401).send('unauthorised')
}
if(!req.isAuthenticated()){
  req.flash('error','You need to login first.')
  return res.redirect('/login')
}
next();
}

const isSeller = (req,res,next)=>{
if(!req.user.role){
  req.flash('error','You do not have permissions.')
  return res.redirect('/products')
}
if(req.user.role !== 'seller'){
  req.flash('error','You do not have permissions.')
  return res.redirect('/products')
}
next();
}

const isProductAuther = async(req,res,next)=>{
let {id} = req.params;
let product = await Product.findById(id);
if(!product.author.equals(req.user._id)){
  req.flash('error','You are not real owner of product.')
  return res.redirect('/products')
}
next();
}

module.exports = {validateProduct , validateReview ,isLoggedIn ,isSeller , isProductAuther}