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
const adminAccess = require("../../middlewares/adminAccess");
// Ordered LIST
const OrderedProducts = require("../../models/orderedproduct/orderedPrd");
const Comment = require("../../models/comments/comments");
///
const ObjectId = require("mongodb").ObjectId;

//admin add product
// /api/admin/addProduct
router.post(
  "/addProduct/:id",
  verify,
  adminAccess,
  upload.single("photo"),
  addProduct
); // "photo" is the input file name

// Admin update product
// /api/admin/updateProduct
router.put(
  "/updateProduct/:id",
  verify,
  adminAccess,
  upload.single("upPhoto"),
  updateProduct
);

//Admin delete Product
// /api/admin/deleteProduct
router.delete("/deleteProduct/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("data");
    let deleteProduct = await Product.findByIdAndRemove(id, { new: true });
    res
      .status(201)
      .json({ message: "Product deleted successfully ! ", deleteProduct });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
// Admin add Post
//  /api/admin/addPost
router.post(
  "/addPost/:id",
  verify,
  adminAccess,
  upload.single("imagePost"),
  addPost
); // "photo" is the input file name

// Admin update Post
//  /api/admin/updatePost
router.put("/updatePost/:id", verify, adminAccess, updatePost); // "photo" is the input file name

//Admin delete Post
// /api/admin/deletePost
router.delete("/deletePost/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("data");
    let deletedPost = await Post.findByIdAndRemove(id, { new: true });
    res
      .status(201)
      .json({ message: "Post deleted successfully ! ", data: deletedPost });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});

//BAN USER
// /api/admin/banUser
router.put("/banUser/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("data");
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
//UNBAN USER
// /api/admin/unbanUser
router.put("/unbanUser/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("data");
    let bannedUser = await User.findByIdAndUpdate(
      id,
      { $set: { isUser: true } },
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

//Add Second Admin
// /api/admin/addAdmin
router.put("/addAdmin/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("data");
    let newAdmin = await User.findByIdAndUpdate(
      id,
      { $set: { isAdmin: true } },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Admin added successfully",
      data: newAdmin,
    });
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
});
//Remove Admin
// /api/admin/removeAdmin
router.put("/removeAdmin/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("data");
    let newAdmin = await User.findByIdAndUpdate(
      id,
      { $set: { isAdmin: false } },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Admin added successfully",
      data: newAdmin,
    });
  } catch (error) {
    res.status(404).json({ message: error });
    console.log(error);
  }
});

//USERS LIST
// /api/admin/usersList
router.get("/usersList/:id", verify, adminAccess, async (req, res) => {
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
router.get("/postsList/:id", verify, adminAccess, async (req, res) => {
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
// /api/admin/productsList
router.get("/productsList/:id", verify, adminAccess, async (req, res) => {
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

//ADMIN GET Ordered List
// /api/admin/orderedList
router.get("/orderedList/:id", verify, adminAccess, async (req, res) => {
  try {
    let OrderedList = await OrderedProducts.find();
    res.status(201).json({
      status: true,
      message: "Command Ordered List ",
      data: OrderedList,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});
// ADMIN Filter Ordered List By Id
// /api/admin/orderedList
router.get("/orderedList/id/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("clientId");
    let filterOrderedList = await OrderedProducts.find({ user: id });
    res.status(201).json({
      status: true,
      message: "Ordered List filtered by ID  ",
      data: filterOrderedList,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

// ADMIN Filter Ordered List By UserFirstName or UserLastName
// /api/admin/orderedList
router.get(
  "/orderedList/userName/:id",
  verify,
  adminAccess,
  async (req, res) => {
    try {
      let firstName = req.header("firstName");
      let lastName = req.header("lastName");
      let filterOrderedList = await OrderedProducts.find({
        userFirstName: firstName,
        userLastName: lastName,
      });
      res.status(201).json({
        status: true,
        message: "Ordered List filtered by firstName or lastName ",
        data: filterOrderedList,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  }
);

// Admin verify status command
// /api/admin/verifyOrder

router.put("/verifyOrder/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("id");
    const updatedOrder = await OrderedProducts.updateMany(
      { user: id },
      { isDelivered: true },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Products are delivered",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

/// Delete Order
// /api/admin/deleteOrder
router.delete("/deleteOrder/:id", verify, adminAccess, async (req, res) => {
  try {
    let id = req.header("id");
    const deletedOrder = await OrderedProducts.deleteMany(
      { user: id },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Order deleted ! ",
      data: deletedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

//ADMIN ADD COMMENT
// /api/admin/comment
router.post("/comment/:id", verify, adminAccess, async (req, res) => {
  try {
    let { text } = req.body;
    let { id } = req.params;
    let postId = req.header("postId");
    const newAdminComment = new Comment({
      userId: id,
      postId,
      userName: "admin",
      text,
    });
    // const adminComment = await newAdminComment.save(); // to show savedPost in response
    await Post.findByIdAndUpdate(postId, {
      $push: { comment: newAdminComment },
    });
    res.status(201).json({
      status: true,
      message: "comment was added",
      data: newAdminComment,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

//ADMIN UPDATE COMMENT
// /api/admin/updateComment
router.put("/updateComment/:id", verify, adminAccess, async (req, res) => {
  try {
    let { newText } = req.body;
    let { id } = req.params;
    var o_id = new ObjectId(id);
    let _id = req.header("postId");
    let updatedComment = await Post.updateOne(
      { _id, "comment.userId": o_id },
      { $set: { "comment.$.text": newText } }
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

//ADMIN DELETE COMMENT
// /api/admin/deleteComment
router.put("/deleteComment/:id", verify, adminAccess, async (req, res) => {
  try {
    let _id = req.header("postId");
    let commId = req.header("commentId");
    var post_id = new ObjectId(_id);
    var o_comm_id = new ObjectId(commId);
    let deletedComment = await Post.updateOne(
      { _id: post_id },
      { $pull: { comment: { _id: o_comm_id } } }
    );
    res.status(201).json({
      status: true,
      message: "comment was deleted successfully",
      data: deletedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

// router exported
module.exports = router;
