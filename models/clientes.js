const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const clientes = sequelize.define(
  "Clientes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CLIENTE: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "clientes",
    timestamps: false,
  }
);

module.exports = clientes;
