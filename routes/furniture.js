const express = require('express');
const Product = require('../models/Product');
const {isLoggedIn} = require('../middleware');
const router = express.Router();

router.get('/:type',async(req,res)=>{
  try{
    let {type} = req.params;
    // console.log(type)
    let products = await Product.find({type:`${type}`});
    // console.log(req.params);
    res.render('products/furniture',{products})
  }
  catch(e){
    res.status(500).render('error',{error:e.message})
  }
})

//executive chairs
// router.get('/furniture/:id',async(req,res)=>{
//   let {id} = req.params;
//   let products = await Product.find({category:`${id}`})
//   res.render('products/furniture',{products})
//   // res.send('ok')
// })

// router.get('/furniture/:type/high-to-low',async(req,res)=>{
//   let {type} = req.params;
//   // console.log(type)
//   let products = await Product.find({type:`${type}`}).sort({price:-1})
//   // console.log(products[0])
//   res.render('products/furniture',{products})
//   // res.send('ok')
// })
// router.get('/furniture/:type/low-to-high',async(req,res)=>{
//   let {type} = req.params;
//   let products = await Product.find({type:`${type}`}).sort({price:1})
//   res.render('products/furniture',{products});
// })

//sidebar redirect page
router.get('/:type/:category',async(req,res)=>{
  let {type,category} = req.params;
  let products = await Product.find({$and:[{type:`${type}`},{category:`${category}`}]});
  // console.log(myCollection)
  res.render('products/furniture',{products})
})


//apply filter
// router.post('/filter',async(req,res)=>{
//   let {category,myCollection,high,low,selectedValue} = req.body;
// let priceProduct = [];
// let categoryProduct = [];
// let collectionProduct = [];
// console.log(selectedValue)
// if(myCollection){
//   collectionProduct = await Product.find({$and:[{type:`${selectedValue}`},{myCollection:`${myCollection}`}]})
// }
// if(category){
//   categoryProduct = await Product.find({$and:[{type:`${selectedValue}`},{category:`${category}`}]})
// }
// let arr1 = priceProduct.concat(categoryProduct);
// let products = collectionProduct.concat(arr1);
// if(low){
//   if(products.length >0){
//   for (var i = 0; i < products.length; i++) { 
//     for (var j = 0; j < (products.length - i - 1); j++) {
//         if (products[j].price > products[j + 1].price) {
//             var temp = products[j]
//             products[j] = products[j + 1]
//             products[j + 1] = temp
//         }
//     }
// }
//   }else{
//     products = await Product.find({type:`${selectedValue}`})
//     for (var i = 0; i < products.length; i++) { 
//       for (var j = 0; j < (products.length - i - 1); j++) {
//           if (products[j].price > products[j + 1].price) {
//               var temp = products[j]
//               products[j] = products[j + 1]
//               products[j + 1] = temp
//           }
//       }
//   }
//   }
// }

// if(high){
//   if(products.length >0){
//   for (var i = 0; i < products.length; i++) { 
//     for (var j = 0; j < (products.length - i - 1); j++) {
//         if (products[j].price < products[j + 1].price) {
//             var temp = products[j]
//             products[j] = products[j + 1]
//             products[j + 1] = temp
//         }
//     }
// }
//   }else{
//     products = await Product.find({type:`${selectedValue}`})
//     for (var i = 0; i < products.length; i++) { 
//       for (var j = 0; j < (products.length - i - 1); j++) {
//           if (products[j].price < products[j + 1].price) {
//               var temp = products[j]
//               products[j] = products[j + 1]
//               products[j + 1] = temp
//           }
//       }
//   }
//   }
// }
//   res.render('products/furniture',{products});
// })

// router.post('/filter', async (req, res) => {
//   let { category, myCollection, high, low, selectedValue } = req.body;
//   let priceProduct = [];
//   let categoryProduct = [];
//   let collectionProduct = [];
//   console.log(myCollection);

//   const filters = [
//     { type: selectedValue, ...(myCollection && { myCollection }) },
//     { type: selectedValue, ...(category && { category }) },
//   ];

//   for (const filter of filters) {
//     if (filter) {
//       const products = await Product.find(filter);
//       if (high || low) {
//         for (let i = 0; i < products.length; i++) {
//           for (let j = 0; j < products.length - i - 1; j++) {
//             if (high && products[j].price < products[j + 1].price) {
//               const temp = products[j];
//               products[j] = products[j + 1];
//               products[j + 1] = temp;
//             } else if (low && products[j].price > products[j + 1].price) {
//               const temp = products[j];
//               products[j] = products[j + 1];
//               products[j + 1] = temp;
//             }
//           }
//         }
//       }
//       if (filter.type === selectedValue) {
//         priceProduct = products;
//       } else if (filter.myCollection) {
//         collectionProduct = products;
//       } else if (filter.category) {
//         categoryProduct = products;
//       }
//     }
//   }

//   let products = [...priceProduct, ...categoryProduct, ...collectionProduct];
//   if (!products.length) {
//     products = await Product.find({ type: selectedValue });
//   }

//   res.render('products/furniture', { products });
// });

router.post('/filter', async (req, res) => {
  const { selectedValue, myCollection, category, price } = req.body;

  let query = {};

  if (selectedValue) {
    query.type = selectedValue;
  }

  if (myCollection && myCollection.length > 0) {
    query.myCollection = { $in: myCollection };
  }

  if (category && category.length > 0) {
    query.category = { $in: category };
  }

  if (price === 'high') {
    query.price = { $gt: 0 };
    products = products.sort((a, b) => b.price - a.price);
  } else if (price === 'low') {
    query.price = { $gt: 0 };
    products = products.sort((a, b) => a.price - b.price);
  }

  const products = await Product.find(query);

  res.render('products/furniture', { products });
});

module.exports = router;