const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  image: { type: String, default: null },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetDate: { type: Date },
});

const model = mongoose.model("User", Schema);

module.exports = model;
