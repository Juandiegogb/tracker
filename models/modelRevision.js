const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const revision = sequelize.define(
  "revision",
  {
    ODT: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CLIENTE: { type: DataTypes.STRING, allowNull: true },
    GRUPO: { type: DataTypes.STRING, allowNull: true },
    "CLASIFICACION DEL EQUIPO": { type: DataTypes.STRING, allowNull: true },
    "ESTADO PLANTA": { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "revision",
    timestamps: false,
  }
);

module.exports = revision;
