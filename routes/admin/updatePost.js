const Post = require("../../models/forum/post");

module.exports = async (req, res) => {
  try {
    let id = req.header("data");
    let { title, content } = req.body;
    let imageUrl = "/uploads/post.png";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    let updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: { title, content } },
      { new: true }
    );
    res.status(201).json({
      status: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};
