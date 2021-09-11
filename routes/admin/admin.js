const express = require("express");
const router = express.Router(); // routes ready to use
const addProduct = require("./addProduct");
const verify = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/uploads");

//admin add product
// /api/admin/addProduct
router.post("/addProduct", verify, upload.single("photo"), addProduct); // "photo" is the input file name

// router exported
module.exports = router;
