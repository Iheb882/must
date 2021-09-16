const express = require("express");
const router = express.Router(); // routes ready to use
//PRODUCT
const Product = require("../../models/product/product");
const addProduct = require("./addProduct");
const updateProduct = require("./updateProduct");
//POST
const Post = require("../../models/forum/post");
const addPost = require("./addPost");
const updatePost = require("./updatePost");
//MIDDLEWARES
const upload = require("../../middlewares/uploads");
const verify = require("../../middlewares/verifyToken");
const User = require("../../models/user/user");

//admin add product
// /api/admin/addProduct
router.post("/addProduct", verify, upload.single("photo"), addProduct); // "photo" is the input file name

// Admin update product
// /api/admin/updateProduct
router.put(
  "/updateProduct/:id",
  verify,
  upload.single("upPhoto"),
  updateProduct
);

//Admin delete Product
// /api/admin/deleteProduct
router.delete("/deleteProduct/:id", verify, async (req, res) => {
  try {
    let { id } = req.params;
    let deleteProduct = await Product.findByIdAndRemove(id);
    res
      .status(201)
      .json({ message: "Product deleted successfully ! ", deleteProduct });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
// Admin add Post
//  /api/admin/addPost
router.post("/addPost", verify, upload.single("imagePost"), addPost); // "photo" is the input file name

// Admin update Post
//  /api/admin/updatePost
router.put("/updatePost/:id", updatePost); // "photo" is the input file name

//Admin delete Post
// /api/admin/deletePost
router.delete("/deletePost/:id", verify, async (req, res) => {
  try {
    let { id } = req.params;
    let deletedPost = await Post.findByIdAndRemove(id);
    res
      .status(201)
      .json({ message: "Post deleted successfully ! ", deletedPost });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

//BAN USER
// /api/admin/banUser
router.put("/banUser/:id", verify, async (req, res) => {
  try {
    let { id } = req.params;
    let bannedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isUser: false } },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "User Banned successfully",
      data: bannedUser,
    });
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
});

//USERS   LIST
// /api/admin/usersList
router.get("/usersList", verify, async (req, res) => {
  try {
    let users = await User.find();
    res.status(201).json({
      status: true,
      message: "Users List ",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

//POSTS  LIST
// /api/admin/postsList
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
// /api/admin/productsList
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

// router exported
module.exports = router;
