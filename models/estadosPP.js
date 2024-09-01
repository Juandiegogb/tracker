const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const estadosP = sequelize.define(
  "estados",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    estado: { type: DataTypes.STRING },
  },
  {
    tableName: "estadoproceso",
    timestamps: false,
  }
);

module.exports = estadosP;
