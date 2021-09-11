const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

// User Schema

const ProductSchema = new Schema(
  {
    category: {
      type: "string",
      required: true,
    },
    productName: {
      type: "string",
      required: true,
    },
    material: {
      type: "string",
      required: true,
    },
    price: {
      type: "number",
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    waterProof: {
      type: Boolean,
      required: true,
    },
    image: {
      type: "string",
      default: "/uploads/img.png",
    },
  },
  { timestamps: true } //date creation user
);

// creating collection database

module.exports = Product = mongoose.model("Product", ProductSchema);
