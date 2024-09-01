const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  if (req.path == "/" || req.path == "/login") {
    next();
  } else {
    const token = req.cookies.token;
    try {
      jwt.verify(token, process.env.secret);
      next();
    } catch (error) {
      res.redirect("/");
    }
  }
}

module.exports = verify;
