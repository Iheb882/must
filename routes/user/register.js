const User = require("../../models/user/user"); //import user model
const { RegisterValidation } = require("./validation");//import input validation
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        let { email, password } = req.body; //destructuring data 
        //*********************************VALIDATION*********
        let {error} = await RegisterValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let checkEmail = await User.findOne({email});//email key & value
        if (checkEmail) {
            return res.status(400).json({
                status: false,
                message: "this email is already exists",
            });
        }
        //*********************HASH PASSWORD************* 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //**********************CREATE NEW USER********* 
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();// to show savedUsed in response 
        
        res.status(201).json({
            status: true,
            message: "WELCOME",
            data: savedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: false, error });
    }
};
