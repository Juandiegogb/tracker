const controller = {};
const matriz = require("../models/matriz");
const estadosP = require("../models/estadosP");
const estadosPP = require("../models/estadosPP");
const fecha = require("../tools/fechaGetter");
const tasks = require("../models/tasks");
const bot = require("../tools/notificador");
const clientes = require("../models/clientes");
const grupos = require("../models/grupos");
const { Op, QueryError } = require("sequelize");
const logger = require("../tools/logger");
const token = require("../tools/tokenGetter");
const historial = require("../models/historial");

controller.s = async (req, res) => {
  const estadosPlanta = {};
  const estadosProceso = {};
  let estados = await estadosP.findAll({ attributes: ["estado"] });
  estados = estados
    .map((estado) => estado.estado)
    .filter((estado) => estado !== null);
  for (const estado of estados) {
    try {
      const temp = await matriz.findAndCountAll({
        where: { "ESTADO PLANTA": estado },
        attributes: ["ODT"],
      });
      estadosPlanta[estado] = temp.count;
    } catch (error) {
      console.error(`Error fetching data for estado "${estado}":`, error);
    }
  }
  estados = {};
  estados = await estadosPP.findAll({ attributes: ["estado"] });
  estados = estados
    .map((estado) => estado.estado)
    .filter((estado) => estado !== null && estado != "");

  for (const estado of estados) {
    try {
      const temp = await matriz.findAndCountAll({
        where: { "ESTADO PROCESO EN PLANTA": estado },
        attributes: ["ODT"],
      });
      estadosProceso[estado] = temp.count;
    } catch (error) {
      console.error(`Error fetching data for estado "${estado}":`, error);
    }
  }
  const total = (await matriz.findAndCountAll({ attributes: ["ODT"] })).count;
  const entregados = (
    await matriz.findAndCountAll({
      where: { "ESTADO PLANTA": "ENTREGADO CLIENTE" },
      attributes: ["ODT"],
    })
  ).count;
  let entregas = await matriz.findAll({
    where: { "ESTADO PLANTA": "APROBADO" },
    attributes: ["FECHA ESTIMADA DE ENTREGA"],
    raw: true,
  });
  const mes = fecha().slice(5, 7);
  let counter = 0;
  for (i in entregas) {
    let temp = String(entregas[i]["FECHA ESTIMADA DE ENTREGA"]);
    if (temp.startsWith(mes)) {
      counter += 1;
    }
  }
  res.render("dashboard", {
    estadosPlanta,
    estadosProceso,
    total,
    entregados,
    counter,
  });
};

//render planeacion
controller.p = async (req, res) => {
  const info = token(req).rol
  const data = await matriz.findAll({
    where: { "ESTADO PLANTA": "APROBADO" },
    raw: true,
  });
  let estados = data.map((item) => item["ESTADO PROCESO EN PLANTA"]);
  estados = new Set(estados);
  estados = Array.from(estados);
  res.render("ingenieria/planeacion", { data, estados , info});
};

//buscar odts
controller.gD = async (req, res) => {
  const query = Array();
  const body = req.body;
  Object.entries(body).forEach(([key, value]) => {
    if (value.trim() !== "") {
      query.push({ [key]: value });
    }
  });
  if (query.length != 0) {
    const data = await matriz.findAll({
      where: { [Op.and]: query },
      order: [["ODT", "DESC"]],
    });
    res.send(data);
  } else {
    res.send([]);
  }
};

//get tareas
controller.gT = async (req, res) => {
  const odt = req.body.odt;
  const tareas = await tasks.findAll({ where: { odt: odt }, raw: true });
  res.send(tareas);
};

controller.fU = async (req, res) => {
  const fecha = req.body.fecha;
  const odt = req.body.odt;
  const user = token(req).username;
  const detalle = `SE ACTUALIZO LA FECHA DE ENTREGA ESTIMADA A ${fecha}`;
  logger(user, odt, detalle);
  const oU = await matriz.findOne({ where: { ODT: odt } });
  oU["FECHA ESTIMADA DE ENTREGA"] = fecha;
  await oU.save();
  res.send("ok");
};

controller.ai = async (req, res) => {
  const d = await matriz.findAll({
    where: { "ESTADO PROCESO EN PLANTA": "PENDIENTE FORMATO REPARACION" },
    raw: true,
    attributes: [
      "ODT",
      "CLIENTE",
      "CLASIFICACION DEL EQUIPO",
      "ESTADO PROCESO EN PLANTA",
    ],
  });
  res.render("ingenieria/ingenieria", { d });
};
controller.ft = async (req, res) => {
  const odt = req.body.odt;
  const oU = await matriz.findOne({
    where: { ODT: odt },
    attributes: [
      "ODT",
      "CLIENTE",
      "CLASIFICACION DEL EQUIPO",
      "ESTADO PROCESO EN PLANTA",
    ],
  });
  oU["ESTADO PROCESO EN PLANTA"] = "LISTO FORMATO REPARACION";
  await oU.save();
  res.redirect("/ingenieria");
};

//revisar
controller.r = async (req, res) => {
  const data = await matriz.findAll({
    where: { "ESTADO PLANTA": "REVISION INGENIERIA" },
  });
  res.render("ingenieria/revisar", { data });
};
//revisar update
controller.rU = async (req, res) => {
  const odt = req.body.ODT;
  const user = token(req).username
  const data = await matriz.findOne({ where: { ODT: odt } });
  const mecanizado = req.body.mecanizado;
  if (mecanizado == "PENDIENTE") {
    res.redirect("/revision");
  } else {
    data["ESTADO PLANTA"] = "LIQUIDACION";
    data["MECANIZADO"] = mecanizado;
    await data.save();
    const mensaje = `@Betty ODT **${odt}** LISTA PARA LIQUIDAR`;
    bot.enviarMensaje("1247654441197502624", mensaje);
    logger(user,odt,"REVISION ODT TERMINADA")
    res.redirect("/revision");
  }
};

//seccion buscador de odts

controller.b = async (req, res) => {
  const info = token(req).rol
  const c = await clientes.findAll({ order: [["CLIENTE", "ASC"]], raw: true });
  const g = await grupos.findAll({ raw: true, order: [["grupo", "ASC"]] });
  const epp = await estadosPP.findAll({
    raw: true,
    order: [["estado", "ASC"]],
  });
  const ep = await estadosP.findAll({ raw: true, order: [["estado", "ASC"]] });
  res.render("app/buscador", { c, g, ep, epp , info});
};


//seccion de historial

controller.h = async (req, res) => {
  data = await historial.findAll();
  res.render("ingenieria/historial", { data });
};

module.exports = controller;
