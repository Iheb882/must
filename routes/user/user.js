const express = require("express");
const router = express.Router(); // routes ready to use
const { register } = require("./register");
const { login } = require("./login");
const Product = require("../../models/product/product");
const Post = require("../../models/forum/post");
const User = require("../../models/user/user");
const verify = require("../../middlewares/verifyToken");
const userAccess = require("../../middlewares/userAccess");
const OrderedPrd = require("../../models/orderedproduct/orderedPrd");

///CREATE USER
// /api/user/register
router.post("/register", register);

///USER LOGIN
// /api/user/login
router.post("/login", login);

//POSTS  LIST
// /api/user/postsList
router.get("/postsList/:id", verify, userAccess, async (req, res) => {
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
router.get("/productsList", async (req, res) => {
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
//FILTER PRODUCTS LIST BY NAME
// /api/user/productsList
router.get("/productsList/brand", async (req, res) => {
  try {
    let { productName } = req.body;
    let products = await Product.find({ productName });
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
//FILTER PRODUCTS LIST BY Name and PRICE
// /api/user/productsList
router.get("/productsList/:price", async (req, res) => {
  try {
    let { price } = req.params;
    let { productName } = req.body;
    let products = await Product.find(
      { productName },
      { price: { $lt: price } }
    );
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
//FILTER PRODUCTS LIST BY PRICE
// /api/user/productsList
router.get("/productsList/price", async (req, res) => {
  try {
    let { price } = req.body;
    let products = await Product.find({ price });
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
// Create Order
// /api/user/create

router.post("/create/:id", verify, userAccess, async (req, res) => {
  try {
    let { phone, city, location, userLastName, userFirstName, quantity } =
      req.body;
    let id = req.header("id");
    let { prdId } = req.header("prdId");
    const product = await Product.findById(prdId);
    const newOrder = new OrderedPrd({
      productId: prdId,
      category: product.category,
      name: product.name,
      material: product.material,
      price: product.price,
      available: product.available,
      waterproof: product.waterproof,
      image: product.image,
      quantity,
      user: id,
      userFirstName,
      userLastName,
      location,
      city,
      phone,
      total: quantity * price,
    });
    const savedPost = await newPost.save(); // to show savedPost in response
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

// router exported
module.exports = router;
