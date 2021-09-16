const express = require("express"); 
const router = express.Router();// routes ready to use 
const { register } = require("./register");
const { login } = require("./login");
const Product = require("../../models/product/product");
const Post = require("../../models/forum/post");
const verify = require("../../middlewares/verifyToken");



///CREATE USER
// /api/user/register
router.post("/register", register); 

///USER LOGIN
// /api/user/login
router.post("/login", login);


//POSTS  LIST
// /api/user/postsList
router.get("/postsList", verify, async (req, res) => {
  try {
    let posts = await Post.find();
    res.status(201).json({
      status: true,
      message: "Posts List ",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

//PRODUCTS   LIST
// /api/user/productsList
router.get("/productsList", verify, async (req, res) => {
  try {
    let products = await Product.find();
    res.status(201).json({
      status: true,
      message: "Products List ",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

// CHART USER
// /api/user/addtochart

// router exported 
module.exports= router; 
