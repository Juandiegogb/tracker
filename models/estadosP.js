const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const estados = sequelize.define(
  "estados",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    estado: { type: DataTypes.STRING },
  },
  {
    tableName: "estadoplanta",
    timestamps: false,
  }
);

module.exports = estados;
