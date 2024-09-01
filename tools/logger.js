const historial = require("../models/historial");
const fecha = require("./fechaGetter");

async function logger(user, odt, detalle = null) {
  await historial.create({
    user: user,
    odt: odt,
    detalle: detalle,
    fecha: fecha(true),
  });
}

module.exports = logger;
