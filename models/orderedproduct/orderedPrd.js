const { boolean } = require("joi");
const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

// OrderedPrd Schema

const OrderedPrdSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
    },
    category: {
      type: "string",
      required: true,
    },
    name: {
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
    waterproof: {
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
    user: {
      // userID
      type: Schema.Types.ObjectId,
    },
    userFirstName: {
      type: "string",
      required: true,
    },
    userLastName: {
      type: "string",
      required: true,
    },
    location: {
      type: "string",
      required: true,
    },
    city: {
      type: "string",
      required: true,
    },
    phone: {
      type: "number",
      required: true,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    total: {
      type: "number",
      required: true,
    },
  },
  { timestamps: true } //date creation
);

// creating collection database

module.exports = OrderedPrd = mongoose.model("OrderedPrd", OrderedPrdSchema);
