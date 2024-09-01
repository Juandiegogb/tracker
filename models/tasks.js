const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");

const tasks = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    odt: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);

module.exports = tasks;
