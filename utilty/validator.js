const { Promise } = require("mongoose");
const { resolve } = require("path");
const validator = require("validator");
const User = require("../model/User");

const emailValidate = (err, req) => {
  console.log("email", req.body.email);
  if (!validator.isEmail(req.body.email)) {
    err["email"] = "use valid email";
  }
};

exports.validateReg = async (err, req) => {
  return new Promise((resolve, reject) => {
    emailValidate(err, req);
    return User.findOne({ email: req.body.email }).then((res) => {
      if (res) {
        err["user"] = "user with email exist";
      }
      resolve(err);
    });
  });
};

exports.validateSign = async (err, req) => {
  return new Promise((resolve, reject) => {
    emailValidate(err, req);
    return User.findOne({ email: req.body.email }).then((res) => {
      if (!res) {
        err["user"] = "user not exist";
      }
      resolve(err);
    });
  });
};
