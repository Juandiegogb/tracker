const matriz = require("../models/matriz");
const controller = {};
const bot = require("../tools/notificador");
const modelClientes = require("../models/clientes");
const modelGrupos = require("../models/grupos");
const modelClasificacion = require("../models/clasificaciones");
const fecha = require("../tools/fechaGetter");
const { Op } = require("sequelize");
const logger = require("../tools/logger");
const token = require("../tools/tokenGetter");

controller.init = async (req, res) => {
  const data = await matriz.findAll({
    where: { "ESTADO PLANTA": "APROBADO" },
    "ESTADO PROCESO EN PLANTA": {
      [Op.notIn]: ["ENSAMBLE", "PINTURA", "PRUEBAS"],
    },
    attributes: [
      "ODT",
      "CLIENTE",
      "CLASIFICACION DEL EQUIPO",
      "MATERIAL",
      "KIT DE SELLOS",
      "OTROS",
      "OBSERVACIONES INSUMOS",
      "FECHA ESTIMADA DE ENTREGA",
      "ESTADO PROCESO EN PLANTA",
      "MECANIZADO",
    ],
    raw: true,
    order:[["ODT","DESC"]]
  });
  res.render("almacen/almacen", { data });
};

controller.refresh = async (req, res) => {
  const sellos = String(req.body.sellos).trim();
  const material = String(req.body.material).trim();
  const otros = String(req.body.otros).trim();
  const observaciones = req.body.observaciones;
  const odt = req.body.odt;
  const data = await matriz.findOne({ where: { ODT: odt } });
  const o = ["LISTO", "N/A", "PENDIENTE"];
  console.log(sellos, material, otros);
  if (o.includes(sellos) && o.includes(material) && o.includes(otros)) {
    data["MATERIAL"] = material;
    data["KIT DE SELLOS"] = sellos;
    data["OTROS"] = otros;
    data["OBSERVACIONES INSUMOS"] = observaciones;
    const temp = sellos + material + otros;
    const m = data["MECANIZADO"];
    const i = "N/AN/AN/A";
    console.log(temp, m);
    if (!temp.includes("PENDIENTE") && (m == "FALSO" || m == 0) && temp != i) {
      console.log("pa ensamble");
      data["ESTADO PROCESO EN PLANTA"] = "ENSAMBLE";
    }
    await data.save();
    res.redirect("almacen/almacen");
  } else {
    res.redirect("almacen/almacen");
  }
};

controller.initODT = async (req, res) => {
  const clientes = await modelClientes.findAll({ raw: true });
  const grupos = await modelGrupos.findAll({ raw: true });
  const clasificaciones = await modelClasificacion.findAll({ raw: true });

  const agruparPorGrupo = (grupos, clasificaciones) => {
    const grupoMap = clasificaciones.reduce((acc, item) => {
      if (!acc[item.grupo]) {
        acc[item.grupo] = [];
      }
      acc[item.grupo].push(item.clasificacion);
      return acc;
    }, {});
    return grupos.reduce((acc, grupo) => {
      acc[grupo.grupo] = grupoMap[grupo.grupo] || [];
      return acc;
    }, {});
  };

  const resultado = agruparPorGrupo(grupos, clasificaciones);
  res.render("almacen/nuevaOdt", { clientes, grupos, resultado });
};

controller.solicitarOdt = async (req, res) => {
  const user = token(req).username;
  const cliente = req.body.cliente;
  const grupo = req.body.grupo;
  const clasificacion = req.body.clasificacion;
  const detalle = req.body.detalle;
  const imagen = req.file.originalname;
  const odt = (await matriz.max("ODT")) + 1;
  await matriz.create({
    ODT: odt,
    CLIENTE: cliente,
    GRUPO: grupo,
    "CLASIFICACION DEL EQUIPO": clasificacion,
    DETALLE: detalle,
    "FECHA DE INGRESO": fecha(),
  });
  logger(user, odt, `SE CREO UNA NUEVA ODT`);
  const mensaje = `${
    token(req).name
  } CREO LA ODT **${odt}** - **${cliente}** - **${clasificacion}** - ${detalle}`;
  bot.enviarMensaje("1248299429342085184", mensaje, imagen);
  res.redirect("/solicitarOdt");
};

controller.eInit = async (req, res) => {
  const d = await matriz.findAll({
    where: { "ESTADO PROCESO EN PLANTA": "TERMINADO EN PLANTA" },
    attributes: [
      "ODT",
      "CLIENTE",
      "CLASIFICACION DEL EQUIPO",
      "ESTADO PROCESO EN PLANTA",
    ],
  });
  res.render("almacen/entregas", { d });
};

controller.e = async (req, res) => {
  const odt = req.body.odt;
  const oU = await matriz.findOne({ where: { ODT: odt } });
  oU["ESTADO PROCESO EN PLANTA"] = "ENTREGADO CLIENTE";
  oU["ESTADO PLAMTA"] = "ENTREGADO CLIENTE";
  oU["FECHA ENTREGA CLIENTE"] = fecha();
  await oU.save();
  res.redirect("/entregas");
};
module.exports = controller;
