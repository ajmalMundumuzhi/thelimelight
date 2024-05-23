var express = require("express");
const { render, response } = require("../app");
var router = express.Router();
var productHelper = require("../helpers/product-helpers");
const { log } = require("handlebars");
const productHelpers = require("../helpers/product-helpers");
const userHelpers = require("../helpers/user-helpers");
/* GET users listing. */
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('admin/login')
  }
}

router.get("/", verifyLogin, function (req, res, next) {
  let admin = req.session.admin;
  productHelpers.getAllProducts().then((products, response) => {
    console.log("Trying to render:", 'admin/view-products'); // Add this line
    res.render('admin/view-products', { products, admin:true });
  }); 
});

router.get("/login", (req, res) => {
  res.render("admin/login");
});
router.get("/signupssfnajksfdnkjgas", (req, res) => {
  res.render("admin/signup");
});
router.post("/signupssfnajksfdnkjgas", async (req, res) => {
  try {
    await userHelpers.doSignup(req.body);
    res.redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.admin = response.admin;
      res.redirect("/admin");
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/add-product", function (req, res) {
  res.render("admin/add-product");
});

router.post("/add-product", (req, res) => {
  productHelper.addProduct(req, (err, result) => {
    let product = req.body;
    console.log(product);
    if (err) {
      // Handle the error
      console.error("Error adding product:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/admin/");
      
    }
  });
});

router.get("/delete-product/:id", (req, res) => {
  let proId = req.params.id;
  // let prodId = req.params.id; // Corrected the variable name
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect("/admin/");
  });
});
router.get("/edit-product/:id", async (req, res) => {
  let product = await productHelpers.getProductDetails(req.params.id);
  console.log("The product is editing:", product);
  res.render("admin/edit-product", { product });
});

router.post("/edit-product/:id", async (req, res) => {
  productHelpers.updateProduct(req.params.id, req.body).then((response) => {
    res.redirect("/admin");
  });
});

module.exports = router;