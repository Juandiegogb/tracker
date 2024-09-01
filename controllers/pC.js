const controller = {};
const matriz = require("../models/matriz");
const bot = require("../tools/notificador");
const fecha = require("../tools/fechaGetter");
const token = require("../tools/tokenGetter");
const logger = require("../tools/logger");

controller.initEnsamble = async (req, res) => {
  const diagnosticos = await matriz.findAll({
    where: { "ESTADO PLANTA": "DIAGNOSTICO" },
    order: [["ODT", "DESC"]],
  });

  const ensambles = await matriz.findAll({
    where: { "ESTADO PROCESO EN PLANTA": "ENSAMBLE" },
    order: [["ODT", "DESC"]],
  });

  const pruebas = await matriz.findAll({
    where: { "ESTADO PROCESO EN PLANTA": "PRUEBAS" },
    order: [["ODT", "DESC"]],
  });

  const pendientesFormato = await matriz.findAll({
    where: { "ESTADO PROCESO EN PLANTA": "PENDIENTE FORMATO REPARACION" },
    attributes: ["ODT", "CLIENTE", "FORMATO"],
    order: [["ODT", "DESC"]],
  });

  const listoFormato = await matriz.findAll({
    where: { "ESTADO PROCESO EN PLANTA": "LISTO FORMATO REPARACION" },
    order: [["ODT", "DESC"]],
  });
  const info = token(req).rol;
  res.render("planta/planta", {
    diagnosticos,
    ensambles,
    pruebas,
    pendientesFormato,
    listoFormato,
    info,
  });
};

controller.diagnosticoTerminado = async (req, res) => {
  const odt = req.body.odt;
  const user = token(req).username;
  const estadoPlanta = await matriz.findOne({
    where: { ODT: odt },
    attributes: ["ODT", "ESTADO PLANTA"],
  });
  await estadoPlanta.update({
    "ESTADO PLANTA": "REVISION INGENIERIA",
    "FECHA ENTREGA  DIAGNOSTICO": fecha(),
    "ESTADO PROCESO EN PLANTA": "DIAGNOSTICO TERMINADO",
    MECANIZADO: "PENDIENTE",
  });
  logger(user,odt,"SE TERMINA DIAGNOSTICO PENDIENTE REVISION");
  bot.enviarMensaje(
    "1247893056997298302",
    `@JUAN ODT **${odt}** LISTA PARA REVISION`
  );
  res.redirect("/planta");
};

controller.ensambleTerminado = async (req, res) => {
  const user = token(req).username;
  const odt = req.body.odt;
  const estadoPlanta = await matriz.findOne({
    where: { ODT: odt },
    attributes: ["ODT", "ESTADO PLANTA"],
  });
  await estadoPlanta.update({ "ESTADO PROCESO EN PLANTA": "PRUEBAS" });
  logger(user,odt,"SE TERMINA ENSAMBLE");
  res.redirect("/planta");
};

controller.pruebasTerminado = async (req, res) => {
  const odt = req.body.odt;
  const user = token(req).username;
  const estadoPlanta = await matriz.findOne({
    where: { ODT: odt },
    attributes: ["ODT", "ESTADO PLANTA"],
  });
  await estadoPlanta.update({
    "ESTADO PROCESO EN PLANTA": "PENDIENTE FORMATO REPARACION",
  });
  logger(user,odt,"SE TERMINAN PRUEBAS");
  res.redirect("/planta");
};

controller.terminado = async (req, res) => {
  const odt = req.body.odt;
  const user = token(req).username;
  const estadoPlanta = await matriz.findOne({
    where: { ODT: odt },
    attributes: ["ODT", "ESTADO PLANTA"],
  });
  await estadoPlanta.update({
    "ESTADO PLANTA": "TERMINADO EN PLANTA",
    "ESTADO PROCESO EN PLANTA": "TERMINADO EN PLANTA",
  });
  logger(user,odt,"REPARACION TERMINADA");
  res.redirect("/planta");
};

const canal = 1139654193188196464;
module.exports = controller;
