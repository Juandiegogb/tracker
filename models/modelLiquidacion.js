const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const liquidaciones = sequelize.define(
  "liquidaciones",
  {
    ODT: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CLIENTE: { type: DataTypes.STRING, allowNull: true },
    "CLASIFICACION DEL EQUIPO": { type: DataTypes.STRING, allowNull: true },
    "ESTADO PLANTA": { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "liquidaciones",
    timestamps: false,
  }
);

module.exports = liquidaciones;
