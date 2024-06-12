var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers=require ('../helpers/user-helpers');


/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  productHelpers.getAllProducts().then((products)=>{
    
    res.render('user/view-products',{products,user})
  })
});
router.get('/product/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id);
  product.Content = product.Content || product.p1
  let products =req.session.user;
console.log(product)
  res.render('user/product',{product, products});
  })
  router.get('/aboutus',(req,res)=>{
    userHelpers.createDocument()
    res.render('user/aboutus')
  })


module.exports = router;