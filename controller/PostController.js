const Post = require("../model/Post");
const User = require("../model/User");
const Review = require("../model/Review");

exports.post = (req, res) => {
  Post.create({
    user: req.user.id,
    message: req.body.message,
  }).then((u) => {
    if (!u) res.json({ err: true, msg: { post: "fail" } });
    res.json({ err: false, msg: { post: u } });
  });
};

exports.get = (req, res) => {
  Post.find({})
    .sort({ createdAt: -1 })
    .populate("user")
    .then((u) => {
      if (!u) res.json({ err: true, msg: { post: "fail" } });
      res.json({ err: false, msg: { post: u } });
    });
};

exports.getreview = (req, res) => {
  Post.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .populate([
      { path: "reviews", populate: { path: "user", model: "User" } },
      "user",
    ])
    .sort({ createdAt: -1 })
    .then((u) => {
      if (!u) res.json({ err: true, msg: { post: "fail" } });
      res.json({ err: false, msg: { post: u } });
    });
};

exports.deletepost = (req, res) => {
  Post.findById(req.params.id).then((u) => {
    if (!u) res.json({ err: true, msg: { post: "fail" } });
    u.remove();

    res.json({ err: false, msg: { post: "deleted" } });
  });
};

exports.putremove = (req, res) => {
  console.log("remove");

  Post.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { reviews: req.params.id },
    },
    { new: true }
  ).then((u) => {
    if (!u) res.json({ err: true, msg: { post: "fail" } });
    Review.findByIdAndDelete({ _id: req.params.id }).then((rem) => {
      if (!rem) res.json({ err: true, msg: { post: "fail" } });
      res.json({ err: false, msg: { post: rem } });
    });
  });
};

exports.postLike = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $push: { like: { $each: [req.body._id], $position: 0 } },
    },
    { new: true }
  ).then((u) => {
    if (!u) res.json({ err: true, msg: { post: "fail" } });

    res.json({ err: false, msg: { post: u } });
  });
};

exports.postUnlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { like: req.body._id },
    },
    { new: true }
  ).then((u) => {
    if (!u) res.json({ err: true, msg: { post: "fail" } });

    res.json({ err: false, msg: { post: u } });
  });
};
