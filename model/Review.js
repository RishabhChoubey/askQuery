const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const model = mongoose.model("Review", reviewSchema);
module.exports = model;
