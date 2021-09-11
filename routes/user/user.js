const express = require("express"); 
const router = express.Router();// routes ready to use 
const { register } = require("./register");
const { login } = require("./login");


///CREATE USER
// /api/user/register
router.post("/register", register); 

///USER LOGIN
// /api/user/login
router.post("/login", login);






// router exported 
module.exports= router; 
