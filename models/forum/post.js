const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema;
const comment = require("../comments/comments");
// User Schema

const PostSchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    content: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      default: "/uploads/post.png",
    },
  },
  { timestamps: true } //date creation user
);

// creating collection database

module.exports = Post = mongoose.model("Post", PostSchema);
