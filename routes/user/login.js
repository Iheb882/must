const User = require("../../models/user/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretToken = process.env.SECRET_TOKEN;

exports.login = async (req, res) => {
    try {
    let { email, password } = req.body;

    //********************VERIFY EMAIL */

    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(401)
            .json({ status: false, message: "Wrong email, please try again" });
    }
    //************************DECRYPT PASSWORD */
    const same = await bcrypt.compare(password, user.password);
    console.log("same", same);
    if (!same) {
        return res.status(401).json({
            status: false,
            message: "Invalid Password, please check again",
        });
    }
    //*************************** CREATE TOKEN */

    const token = jwt.sign(
        { id: user._id, email: user.email, password: user.password },
        secretToken,
        {
            expiresIn: "1d",
        }
    );
    // req.header("jwt", token);
    res.status(201).json({
        status: true,
        message: `WELCOME `,
        id: user._id,
        token,
        isAdmin: user.isAdmin,
        isUser: user.isUser,
    });
} catch(error) {
    console.log(error);
    res.status(401).json({error})
}
};
