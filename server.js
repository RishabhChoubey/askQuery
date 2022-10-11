const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const review = require("./route/ReviewsRoute");
const reaction = require("./route/ReactionRoute");
const users = require("./route/UsersRoute");
const post = require("./route/PostsRoute");
const app = express();
require("dotenv").config();
const { MONGOURI } = require("./utilty/key");
///////////////////////////////middleware//////////////////////////////

app.use(cors());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///////////////////////// mongoose setup/////////////////////////////

try {
  mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("conected....to mongoose");
} catch (error) {
  console.log(error);
}

/////////////////////////////////////////////

app.use("/api/users", users);
app.use("/api/posts", post);
app.use("/api/review", review);
// app.use("api/reaction", reaction);

//////////////////////////////////////////////

if (process.env.NODE_ENV === "production") {
  console.log("production");
  app.use(express.static("client/frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/frontend/build/index.html"));
  });
}

app.listen(process.env.PORT || 2000, () => {
  console.log("listenning...");
});
