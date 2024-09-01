const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const solicitudes = sequelize.define(
  "solicitudes",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fechaSolicitud: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fechaEntrega: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'PENDIENTE'
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    solicitadoPor: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    odt: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "solicitudes",
    timestamps: false,
  }
);

module.exports = solicitudes;
