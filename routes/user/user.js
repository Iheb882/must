const express = require("express");
const router = express.Router(); // routes ready to use
const { register } = require("./register");
const { login } = require("./login");
const Product = require("../../models/product/product");
const Chart = require("../../models/chart/chart");
const Post = require("../../models/forum/post");
const User = require("../../models/user/user");
const verify = require("../../middlewares/verifyToken");
const userAccess = require("../../middlewares/userAccess");
const OrderedPrd = require("../../models/orderedproduct/orderedPrd");
const Comment = require("../../models/comments/comments");
///CREATE USER
// /api/user/register
router.post("/register", register);

///USER LOGIN
// /api/user/login
router.post("/login", login);

//POSTS LIST
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

//PRODUCTS LIST
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
    let products = await Product.find({
      productName: productName.toLowerCase(),
    });
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
//MEN PRODUCTS LIST
// /api/user/productsList
router.get("/productsList/men", async (req, res) => {
  try {
    let products = await Product.find({ category: "homme" });
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
//WOMEN PRODUCTS LIST
// /api/user/productsList
router.get("/productsList/women", async (req, res) => {
  try {
    let products = await Product.find({ category: "femme" });
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
    let { productName, maxPrice, minPrice } = req.body;
    let products = await Product.find({
      productName,
      price: { $lte: maxPrice, $gte: minPrice },
    });
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
// Create Chart
// /api/user/create

router.post("/createChart/:id", verify, userAccess, async (req, res) => {
  try {
    let { id } = req.params;
    let { quantity } = req.body;
    let _id = req.header("prdId");
    console.log("id", _id);
    const product = await Product.findById({ _id });
    const newChart = new Chart({
      productId: _id,
      userId: id,
      category: product.category,
      productName: product.productName,
      material: product.material,
      price: product.price,
      available: product.available,
      waterProof: product.waterProof,
      image: product.image,
      quantity,
    });
    const chart = await newChart.save(); // to show savedPost in response
    res.status(201).json({
      status: true,
      message: "product added to chart successfully",
      data: chart,
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
    let { phone, city, location, userLastName, userFirstName } = req.body;
    let { id } = req.params;
    let _id = req.header("prdId");
    const chart = await Chart.find({ userId: id });
    console.log("chart", chart);
    const newOrder = new OrderedPrd({
      // category: chart.category,
      // productName: chart.productName,
      // material: chart.material,
      // available: chart.available,
      // waterProof: chart.waterProof,
      // price: chart.price,
      // image: chart.image,
      user: id,
      userFirstName,
      userLastName,
      location,
      city,
      phone,
      // total: chart.quantity * chart.price,
    });
    const Order = await newOrder.save(); // to show savedPost in response
    res
      .status(201)
      .json({ status: true, message: "order sent successfully", data: Order });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

//USER ADD COMMENT
// /api/user/comment
router.post("/comment/:id", verify, userAccess, async (req, res) => {
  try {
    let { userName, text } = req.body;
    let userId = req.params;
    let postId = req.header("postId");
    const newPost = new Comment({
      userId,
      postId,
      userName,
      text,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});
//USER UPDATE COMMENT
// /api/user/updateComment
router.post("/updateComment/:id", verify, userAccess, async (req, res) => {
  try {
    let { text } = req.body;
    let { commentId } = req.header("commentId");
    let updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: { text },
      },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "comment was updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});
//USER DELETE COMMENT
// /api/user/deleteComment
router.post("/deleteComment/:id", verify, userAccess, async (req, res) => {
  try {
    let { commentId } = req.header("commentId");
    let deletedComment = await Comment.findByIdAndDelete(commentId, {
      new: true,
    });
    res.status(201).json({
      status: true,
      message: "comment was updated successfully",
      data: deletedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

// router exported
module.exports = router;
