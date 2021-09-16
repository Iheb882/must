const Post = require("../../models/forum/post");

module.exports = async (req, res) => {
  try {
    let { title, content } = req.body;
    let photoUrl = "/uploads/post.png";
    if (req.file) {
      photoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    const newPost = new Post({
      title,
      content,
      image: photoUrl,
    });
    const savedPost = await newPost.save(); // to show savedPost in response

    res.status(201).json({
      status: true,
      message: "Post added successfully ! ",
      data: savedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};
