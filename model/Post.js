const mongoose = require("mongoose");
const Review = require("../model/Review");
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },

    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

Schema.pre("remove", { query: false, document: true }, async function (next) {
  let self = this;
  console.log("remoovveddd", self._id);
  Review.remove({ postid: self._id }).then((u) => {
    console.log(u, "revirew");
  });
});

module.exports = mongoose.model("Post", Schema);
