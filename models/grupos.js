const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const grupos = sequelize.define(
  "grupos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    grupo: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "grupos",
    timestamps: false,
  }
);

module.exports = grupos;
