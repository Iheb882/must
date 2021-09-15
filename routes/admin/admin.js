const express = require("express");
const router = express.Router(); // routes ready to use
const addProduct = require("./addProduct");
const verify = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/uploads");
const Product = require("../../models/product/product");
const addPost = require("./addPost");
const editPost = require("./editPost");
const Post = require("../../models/forum/post");

//admin add product
// /api/admin/addProduct
router.post("/addProduct", verify, upload.single("photo"), addProduct); // "photo" is the input file name

// Admin update product
// /api/admin/updateProduct

router.put(
  "/updateProduct/:id",
  verify,
  upload.single("upPhoto"),
  async (req, res) => {
    // to import id from front
    try {
      let { category, productName, material, price, available, waterProof } =
        req.body;
      // console.log("filename", req.file.filename);
      let photoUrl = "/uploads/img.png";
      if (req.file) {
        photoUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }
      // else {
      //   photoUrl = "/uploads/post.png";
      // }

      console.log("body", req.body);
      let { id } = req.params;
      await Product.findByIdAndUpdate(id, {
        $set: {
          category,
          productName,
          material,
          price,
          available,
          waterProof,
          image: photoUrl,
        },
      });
      let updateProduct = await Product.findById(id);
      res.status(201).json({
        status: true,
        message: "Product updated successfully",
        data: updateProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  }
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
// Admin edit Post
//  /api/admin/editPost
router.put("/editPost/:id", verify, upload.single("imageUpPost"), editPost); // "photo" is the input file name

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
// router exported
module.exports = router;
