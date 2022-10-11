const jwt = require("jsonwebtoken");
require("dotenv").config();
const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.SecretCode
  );
};
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token.slice(7, token.length), "abcdefghijk", (err, decode) => {
      if (err) {
        return res.json({ err: true, msg: { token: "invalid token" } });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.json({ err: true, msg: { token: "login first" } });
  }
};

module.exports = { getToken, isAuth };
