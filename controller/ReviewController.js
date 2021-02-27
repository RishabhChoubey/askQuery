const Post = require("../model/Post");
const Review = require("../model/Review");

exports.post = (req, res) => {
  Review.create({
    user: req.user.id,
    message: req.body.message,
    postid: req.params.id,
  }).then((u) => {
    if (!u) res.json({ err: true, msg: { post: "fail" } });

    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { reviews: { $each: [u._id], $position: 0 } } },
      { new: true }
    )
      .then((p) => {
        res.json({ err: false, msg: { post: u } });
      })
      .catch((err) => {
        res.json({ err: true, msg: { post: err } });
      });
  });
};
