const sequelize = require("../db/db");

const getTables = async (req, res, next) => {
  try {
    await sequelize.query("CALL copiarClientesSinRepetir");
    await sequelize.query("CALL copiarClasificaciones");
    await sequelize.query("CALL getEstadoProceso");
    await sequelize.query("CALL getEstados");
    await sequelize.query("CALL getGrupos");
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getTables;
