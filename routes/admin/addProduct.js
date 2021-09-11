const Product = require("../../models/product/product");

module.exports = async (req, res) => {
  console.log(req.body);
  try {
    let { category, productName, material, price, available, waterProof } =
      req.body;
    let photoUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    const newProduct = new Product({
      category,
      productName,
      material,
      price,
      available,
      waterProof,
      image: photoUrl,
    });
    const savedProduct = await newProduct.save(); // to show savedProduct in response

    res.status(201).json({
      status: true,
      message: "Product  added successfully ! ",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};
