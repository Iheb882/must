const User = require("../models/user/user");

module.exports = async (req, res, next) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    if (user.isUser) {
      next();
    } else {
      res.status(402).json({
        status: false,
        message: "Access denied! please Login.",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(405).json({ message: error }); // condition for : User access
  }
};
