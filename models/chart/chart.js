const { string, number } = require("joi");
const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

// User Schema

const ChartSchema = new Schema(
  {
    quantity: {
      type: "number",
      required: true,
    },
  },
  { timestamps: true }
);

// creating collection database

module.exports = Chart = mongoose.model("Chart", ChartSchema);
