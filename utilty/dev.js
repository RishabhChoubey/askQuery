require("dotenv").config();

module.exports = {
  MONGOURI: process.env.MONGOURI,
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  user_EMAIL: process.env.user_EMAIL,
  pass_PASS: process.env.pass_PASS,
};
