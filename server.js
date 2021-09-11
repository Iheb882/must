//import express & mongoose
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const upload = require("./middlewares/uploads");
//extension express
const app = express();
app.use(express.json()); //transform the request to json
require("dotenv").config();

const port = process.env.PORT; // import Hidden PORT
const uri = process.env.URI;
// connection to database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));
// Routes//
app.use("/api/user", require("./routes/user/user")); //user routes
app.use("/api/admin", require("./routes/admin/admin")); //admin routes

// Upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//server listen//
app.listen(port, () => console.log("server is running"));
