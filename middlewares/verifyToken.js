const jwt = require("jsonwebtoken");
require("dotenv").config(); // to use process.env
const secretToken = process.env.SECRET_TOKEN; //import secret token

module.exports = async (req, res, next) => {
  const token = req.header("jwt");
  if (!token) {
    return res.status(401).send("Access denied"); //  condition for : user doesn't log in or token doesn't exist
  }
  try {
    const verified = await jwt.verify(token, secretToken);
    console.log(verified);
    req.user = verified;
    // req.token = token;
    next();
  } catch (error) {
    // console.log(error);
    res.status(405).send("invalid token"); // condition for : user with invalid token
  }
};
