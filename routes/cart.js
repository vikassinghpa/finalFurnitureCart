const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const {isLoggedIn} = require('../middleware');
const stripe = require('stripe')
('sk_test_51ObzemSAN1sJa92KzbwUGIlfMPC3izaYtvDsO3OplX88TO81eVBWJupn4X3pxtuUWGe7DNdvrinoszkl0lscfWpm00gz3aPWBe')
const router = express.Router();

//display all cart items
router.get('/user/cart',isLoggedIn ,async(req,res)=>{
  try{
    let userId = req.user._id;
    let user = await User.findById(userId).populate({path:'cart',populate:{path:'product'}});
    let arr=[];
    let totalAmount = 0;
    for(let item of user.cart){
      let productId = item.product;
      let qty = item.quantity;
      
      let newProduct =  await  Product.findById(productId)
      
      let obj={
        product: newProduct,
        quantity:qty,
      }
      arr.push(obj);

      //calculate the totalAmount;
      totalAmount += newProduct.price*qty;
    }
    res.render('cart/cart',{arr,totalAmount,user})
  }
  catch(e){
    res.status(500).render('error',{error:e.messae})
  }
})

//add to cart
router.post('/user/:id/add',isLoggedIn , async(req,res)=>{
  try{

    let {id} = req.params;
    let userId = req.user._id;
    let user = await User.findById(userId).populate('cart');
    let product = await Product.findById(id);
    
    let ans=false;
    let cartId=0;
    for(let item of user.cart){
      if(item.product._id == id){
        ans=true;
        cartId=item._id;
      }
    }
    
    if(ans==false){
      
      let newCart = new Cart({product});
      await newCart.save();
      
      await  user.cart.push(newCart);
      await user.save();
      
      req.flash('success',`${product.name} added to your cart. ${user.firstName}!`)
      res.redirect(`/products/${id}`);
    }
    else{
      await Cart.findByIdAndUpdate(cartId,{$inc:{quantity:1}})
      req.flash('success',`${product.name} updated to your cart. ${user.firstName}!`)
      res.redirect("/user/cart");
    }
  }
  catch(e){
    res.status(500).render('error',{error:e.message})
  }
})

//substractin the product from cart
router.post("/user/:id/substract",isLoggedIn ,async(req,res)=>{
  try{

    let { id } = req.params;
    let userId = req.user._id;
    let user = await User.findById(userId).populate('cart');
    let product = await Product.findById(id);
    
    let ans=false;
    let cartId=0;
    for(let item of user.cart){
      if(item.product._id== id){
        ans=true;
        cartId=item._id;
      }
    }
    if(ans==false){
      
      let newCart = new Cart({product});
      await newCart.save();
      
      await  user.cart.push(newCart);
      await user.save();
      res.redirect("/user/cart");
    }
    else{
      await Cart.findByIdAndUpdate(cartId,{$inc:{quantity:-1}})
      res.redirect("/user/cart");
    }
  }
  catch(e){
    res.status(500).render('error',{error:e.message})
  }
})


//delete from the cart
router.delete('/user/cart/:id',isLoggedIn ,async(req,res)=>{
  try{

    let {id} =req.params;
    let userId = req.user._id;
    let user = await User.findById(userId);
    let product = await Product.findById(id);
    await user.cart.pop(product);
    await user.cart.save();
    await user.save();
    req.flash('success',`${product.name} deleted from you cart. ${user.firstName}!`)
    res.redirect('/user/cart')
  }
  catch(e){
    res.status(500).render('error',{error:e.message})
  }
  })
  
//checkout page
router.get('/checkout/:id',async(req,res)=>{
let userId = req.user._id;
let user = await User.findById(userId).populate({path:'cart',populate:{path:'product'}});
let totalAmount = await user.cart.reduce(async(sumProduct,item)=>{
let sum = await sumProduct;
let product = await Product.findById(item.product);
return sum + (product ? product.price*item.quantity :0)
},0);

const customer = await stripe.customers.create({
  name: 'Jenny Rosen',
  address: {
    line1: '510 Townsend St',
    postal_code: '98140',
    city: 'New delhi',
    state: 'Delhi',
    country: 'India',
  },
})

const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'inr',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: totalAmount*100,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'http://localhost:4242/success',
  cancel_url: 'http://localhost:4242/cancel',
  payment_method_types: ['card'],
});

res.redirect(303, session.url);
})

module.exports = router;