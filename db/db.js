const { Sequelize } = require("sequelize");

const db = process.env.database;
const user = process.env.user;
const password = process.env.password;
const sequelize = new Sequelize(db, user, password, {
  host: "localhost",
  dialect: "mysql",
  timezone: "-05:00",
  logging: false,
});

module.exports = sequelize;
