const mongoose= require("mongoose");//import mongoose 
const Schema= mongoose.Schema

// User Schema

const UserSchema = new Schema(
    {
        email: {
            type: "string",
            required: true,
        },
        password: {
            type: "string",
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isUser: {
            type: Boolean,
            default: true,
        },
    },
    {timestamps: true}//date creation user

);

// creating collection database

module.exports= User =mongoose.model("User", UserSchema) ; 