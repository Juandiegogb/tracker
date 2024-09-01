const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const clasificaciones = sequelize.define(
  "clasificaciones",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clasificacion: {
      type: DataTypes.STRING,
    },
    grupo: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "clasificaciones",
    timestamps: false,
  }
);

module.exports = clasificaciones;
