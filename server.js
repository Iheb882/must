//import express & mongoose
const express = require("express")
const mongoose = require("mongoose")
//extension express 
const app= express();
app.use(express.json())//transform the request to json 
require("dotenv").config(); 

const port= process.env.PORT // import Hidden PORT 
const uri=process.env.URI
// connection to database
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    
})
.then(()=>console.log("connected to database"))
.catch((error)=>console.log(error));
// Routes// 
app.use("/api/user", require("./routes/user/user")  )//user routes

//server listen// 
app.listen(port, ()=>console.log("server is running"));

