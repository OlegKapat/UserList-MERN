const { Schema, model } = require("mongoose");

const userAuth = new Schema({
  name: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String, default: "" },
});
module.exports = model("userauth", userAuth);
