const users = require("../models/users");
const controller = {};
const jwt = require("jsonwebtoken");

controller.serve = (req, res) => {
  const allCookies = req.cookies;
  Object.keys(allCookies).forEach((cookieName) => {
    res.clearCookie(cookieName);
  });
  res.render("app/login");
};

controller.auth = async (req, res) => {
  const secretKey = process.env.secret;
  const user = req.body.username;
  const password = req.body.password;
  let userInfo = await users.findOne({ where: { username: user } });
  if (userInfo != null && userInfo.password == password) {
    userInfo = userInfo.dataValues;
    delete userInfo.password;
    const token = jwt.sign(userInfo, secretKey);
    res.cookie("token", token, { maxAge: 600000, httpOnly: true });
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
};
module.exports = controller;
