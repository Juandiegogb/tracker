const controller = {};
const logger = require("../tools/logger");
const modelLiquidaciones = require("../models/modelLiquidacion");
const modelSolicitudes = require("../models/modelSolicitudes");
const token = require("../tools/tokenGetter");

controller.serve = async (req, res) => {
  const data = await modelLiquidaciones.findAll();
  res.render("administrativo/liquidaciones", { data });
};

controller.rL = async (req, res) => {
  const odt = req.body.ODT;
  const odtToUpdate = await modelLiquidaciones.findOne({ where: { ODT: odt } });
  odtToUpdate["ESTADO PLANTA"] = "PENDIENTE APROBACION CLIENTE";
  odtToUpdate.save();
  const user = token(req).username;
  logger(user,odt,"LIQUIDACION TERMINADA")
  res.redirect("liquidaciones");
};

controller.s = async (req, res) => {
  const data = await modelSolicitudes.findAll();
  res.render("administrativo/solicitudes", { data });
};

controller.aFS = async (req, res) => {
  const nuevaFecha = req.body.fechaEntrega;
  const id = req.body.id;
  const idToUpdate = await modelSolicitudes.findOne({ where: { id: id } });
  idToUpdate["fechaEntrega"] = nuevaFecha;
  idToUpdate.save();
  res.redirect("/solicitudes");
};

module.exports = controller;
