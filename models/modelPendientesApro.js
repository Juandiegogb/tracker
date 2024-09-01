const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const PendienteAprobacion = sequelize.define(
  "PendienteAprobacion",
  {
    ODT: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    CLIENTE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GRUPO: {
      type: DataTypes.STRING,
    },
    "CLASIFICACION DEL EQUIPO": {
      type: DataTypes.STRING,
    },
    "ESTADO PLANTA": {
      type: DataTypes.STRING,
    },
    "ESTADO PROCESO EN PLANTA": {
      type: DataTypes.STRING,
    },
    "N° COTIZACIÓN": {
      type: DataTypes.STRING,
    },
    "N° ORDEN DE COMPRA": {
      type: DataTypes.STRING,
    },
    PRECIO: {
      type: DataTypes.STRING,
    },
    "FECHA DE APROBACIÓN": {
      type: DataTypes.STRING,
    },
    "COMERCIAL": {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "pendientesaprobacion",
    timestamps: false,
  }
);

module.exports = PendienteAprobacion;
