const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Matriz = sequelize.define(
  "Matriz",
  {
    ODT: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    CLIENTE: {
      type: DataTypes.TEXT,
    },
    COMERCIAL: {
      type: DataTypes.STRING,
      defaultValue: "JG",
    },
    "FECHA DE INGRESO": {
      type: DataTypes.TEXT,
    },
    GRUPO: {
      type: DataTypes.TEXT,
    },
    "CLASIFICACION DEL EQUIPO": {
      type: DataTypes.TEXT,
    },
    CANT: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    "SOLPED/REMISION": {
      type: DataTypes.TEXT,
    },
    DETALLE: {
      type: DataTypes.TEXT,
    },
    "ESTADO PLANTA": {
      type: DataTypes.STRING,
      defaultValue: "DIAGNOSTICO",
    },
    "FECHA DE APROBACIÓN": {
      type: DataTypes.TEXT,
    },
    "FECHA ENTREGA  DIAGNOSTICO": {
      type: DataTypes.TEXT,
    },
    "FECHA ESTIMADA DE ENTREGA": {
      type: DataTypes.TEXT,
    },
    "FECHA TERMINADO EN PLANTA": {
      type: DataTypes.TEXT,
    },
    "ESTADO INFORME": {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE DIAGNOSTICO",
    },
    MECANIZADO: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "FECHA ENTREGA MECANIZADO": {
      type: DataTypes.TEXT,
    },
    "ESTADO PROCESO EN PLANTA": {
      type: DataTypes.STRING,
      defaultValue: "DIAGNOSTICO",
    },
    OBSERVACIONES: {
      type: DataTypes.TEXT,
    },
    "FECHA ENTREGA CLIENTE": {
      type: DataTypes.TEXT,
    },
    "N° COTIZACIÓN": {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE",
      allowNull: false,
    },
    "N° ORDEN DE COMPRA": {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE",
      allowNull: false,
    },
    "N° REMISION": {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE",
    },
    "N° FACTURA": {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE",
    },
    "TIEMPO DIAGNOSTICO": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "TIEMPO ENSAMBLE": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "TIEMPO PRUEBA": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "TIEMPO PINTURA": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "TIEMPO MECANIZADO": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "TIEMPO SOLDADURA": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PRECIO: {
      type: DataTypes.STRING(2550),
      defaultValue: "0,00 COP",
    },
    "FECHA ENVIO COTIZACION": {
      type: DataTypes.TEXT,
    },
    MATERIAL: {
      type: DataTypes.STRING,
    },
    "KIT DE SELLOS": {
      type: DataTypes.STRING,
    },
    OTROS: {
      type: DataTypes.STRING,
    },
    "OBSERVACIONES INSUMOS": {
      type: DataTypes.TEXT,
    },
    FORMATO: {
      type: DataTypes.STRING,
      defaultValue: "PENDIENTE",
    },
    "FECHA ESTIMADA DE MECANIZADO": {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    "LISTO PARA MECANIZAR":{
      type:DataTypes.STRING,
      defaultValue: "NO",
    }
  },
  {
    sequelize,
    tableName: "matriz",
    timestamps: false,
  }
);

module.exports = Matriz;
