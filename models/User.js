const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

module.exports = mongoose.model("UserModel", User);
