const Post = require("../../models/forum/post");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, content } = req.body;
    let photoUrl = "/uploads/post.png";
    console.log("file", req.file);
    if (req.file) {
      photoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    await Post.findByIdAndUpdate(id, {
      $set: { title, content, image: photoUrl },
    });
    let updatedPost = await Post.findById(id);
    res.status(201).json({
      status: true,
      message: "Post updated successfully ! ",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};
