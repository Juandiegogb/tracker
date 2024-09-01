const jwt = require("jsonwebtoken");

function token(req) {
  return jwt.verify(req.cookies.token, process.env.secret);
}

module.exports = token;
