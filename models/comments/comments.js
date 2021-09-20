const { date } = require("joi");
const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;

// Comment Schema

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    postId: {
      type: Schema.Types.ObjectId,
    },
    userName: {
      type: "string",
      required: true,
    },
    text: {
      type: "string",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true } //date creation user
);

// creating collection database

module.exports = Comment = mongoose.model("Comment", CommentSchema);
