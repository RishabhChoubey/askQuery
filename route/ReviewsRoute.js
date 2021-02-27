const express = require("express");
const { isAuth } = require("../utilty/util");
const router = express.Router();
const { post, get } = require("../controller/ReviewController");

router.post("/post/:id", isAuth, post);
router.get("/", (req, res) => {
  res.send("hello");
});
module.exports = router;
