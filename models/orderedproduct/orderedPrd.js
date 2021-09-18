const { boolean } = require("joi");
const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

// OrderedPrd Schema

const OrderedPrdSchema = new Schema(
  {
    // category: {
    //   type: "string",
    //   required: true,
    // },
    // productName: {
    //   type: "string",
    //   required: true,
    // },
    // material: {
    //   type: "string",
    //   required: true,
    // },
    // price: {
    //   type: "number",
    //   required: true,
    // },
    // available: {
    //   type: Boolean,
    //   required: true,
    // },
    // waterProof: {
    //   type: Boolean,
    //   required: true,
    // },
    // image: {
    //   type: "string",
    //   default: "/uploads/img.png",
    // },
    chart: [],
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
    },
  },
  { timestamps: true } //date creation
);

// creating collection database

module.exports = OrderedPrd = mongoose.model("OrderedPrd", OrderedPrdSchema);
