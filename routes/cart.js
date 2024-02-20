const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const {isLoggedIn} = require('../middleware');
const stripe = require('stripe')('sk_test_51OlkmqSAEucVXOAJqFUTN5Am5VWvFQmvB6nqWhn3XV0QyDqGO5z4q3CmVmlH9fK46Uhe8uCxzSuxTG3LxDDnpzMb00BKGtvjva')

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
// router.post("/user/:id/substract",isLoggedIn ,async(req,res)=>{
//   try{

//     let { id } = req.params;
//     let userId = req.user._id;
//     let user = await User.findById(userId).populate('cart');
//     let product = await Product.findById(id);
    
//     let ans=false;
//     let cartId=0;
//     for(let item of user.cart){
//       if(item.product._id== id){
//         ans=true;
//         cartId=item._id;
//       }
//     }
//     if(ans==false){
      
//       let newCart = new Cart({product});
//       await newCart.save();
      
//       await  user.cart.push(newCart);
//       await user.save();
//       res.redirect("/user/cart");
//     }
//     else{
//       await Cart.findByIdAndUpdate(cartId,{$inc:{quantity:-1}})
//       res.redirect("/user/cart");
//     }
//   }
//   catch(e){
//     res.status(500).render('error',{error:e.message})
//   }
// })


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
  
// checkout page
router.get('/payment/:id',async(req,res)=>{
let userId = req.params.id;


let user = await User.findById(userId).populate("cart");

let arr=  await Promise.all(user.cart.map(async (item)=>{
  return {
    product:await  Product.findById(item.product),
    quantity:item.quantity
  } 
}))
//stripe
const session = await stripe.checkout.sessions.create({
  line_items: arr.map((item)=>{
    return  {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
        },
        unit_amount:(item.product.price*100),
      },
      quantity: item.quantity,
    }
  })
  ,
  mode: 'payment',
  success_url: 'http://localhost:8080/paymentSuccess',
  cancel_url: 'http://localhost:4242/cancel',
});
//successPayment
router.get("/paymentSuccess",async(req,res)=>{
  try{
    console.log("hii");
    res.render("cart/paymentSucc") 
  }
  catch(e){
    res.status(500).render('error',{error:e.message})
  }
  
})

// console.log(arr);

res.redirect(303, session.url);
});
 


module.exports = router;