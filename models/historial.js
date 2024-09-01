const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const historial = sequelize.define(
  "actividades",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.STRING,
    },
    odt: {
      type: DataTypes.STRING,
    },
    detalle: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "historial",
    timestamps: false,
  }
);

module.exports = historial;
