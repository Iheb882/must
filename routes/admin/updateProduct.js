const Product = require("../../models/product/product");

module.exports = async (req, res) => {
  try {
    let { id } = req.header("data");
    let { category, productName, material, price, available, waterProof } =
      req.body;
    let imageUrl = "/uploads/img.png";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    let updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          category,
          productName,
          material,
          price,
          available,
          waterProof,
        },
      },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};
