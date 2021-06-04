const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const path = require("path");

mongoose
  .connect("mongodb+srv://bombastik:1q2q3q4q@cluster0.px7le.mongodb.net/User?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB подключена"))
  .catch((error) => console.log(error));
app.use(express.json({extended:true}))
app.use(require("morgan")("dev"));
app.use("/my-uploads", express.static("my-uploads"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require("cors")());
app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.use("/api/auth", authRoutes);

module.exports = app;
