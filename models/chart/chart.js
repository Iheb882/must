const { string, number } = require("joi");
const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

// User Schema

const ChartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
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
    quantity: {
      type: "number",
      required: true,
      default: 1,
    },
  },
  { timestamps: true } //date creation user
);

// creating collection database

module.exports = Chart = mongoose.model("Chart", ChartSchema);
