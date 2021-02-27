const express = require("express");
const { isAuth } = require("../utilty/util");
const router = express.Router();
const { post, get, getreview } = require("../controller/PostController");
const {
  deletepost,
  putremove,
  postLike,
  postUnlike,
} = require("../controller/PostController");
router.post("/post", isAuth, post);
router.get("/", get);
router.get("/postr/:id", getreview);
router.delete("/post/delete/:id", isAuth, deletepost);
router.put("/post/remove/:id", isAuth, putremove);
router.put("/like/:id", isAuth, postLike);
router.put("/unlike/:id", isAuth, postUnlike);
module.exports = router;
