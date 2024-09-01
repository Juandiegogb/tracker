const controller = {};
const modelPendienteApro = require("../models/modelPendientesApro");
const fecha = require("../tools/fechaGetter");
const logger = require("../tools/logger");
const bot = require("../tools/notificador");
const token = require("../tools/tokenGetter");

controller.getData = async (req, res) => {
  const data = await modelPendienteApro.findAll({
    order: [["ODT", "DESC"]],
  });
  res.render("administrativo/pendienteAprobacion", { data });
};

controller.actualizar = async (req, res) => {
  const odt = req.body.ODT;
  const aprobacionToUpdate = await modelPendienteApro.findOne({
    where: { ODT: odt },
  });
  aprobacionToUpdate["ESTADO PLANTA"] = req.body.estadoPlanta;
  aprobacionToUpdate["N° COTIZACIÓN"] = req.body.cotizacion;
  let ordenCompra = String(req.body.ordenCompra).trim().toUpperCase();
  if (
    ordenCompra == "PENDIENTE" ||
    parseInt(ordenCompra) <= 0 ||
    ordenCompra == ""
  ) {
    res.redirect("/aprobaciones");
  } else {
    aprobacionToUpdate["N° ORDEN DE COMPRA"] = req.body.ordenCompra;
    let precio = String(req.body.precio);
    if (precio.includes("COP") || precio.includes(",00")) {
      precio = precio.replace(",00", "").replace("COP", "");
      aprobacionToUpdate["PRECIO"] = precio;
    } else {
      aprobacionToUpdate["PRECIO"] = req.body.precio;
    }
    if (req.body.estadoPlanta == "APROBADO") {
      aprobacionToUpdate["FECHA DE APROBACIÓN"] = fecha();
      aprobacionToUpdate["COMERCIAL"] = token(req).name;
      aprobacionToUpdate["ESTADO PROCESO EN PLANTA"] = "COMPRAS";
      bot.enviarMensaje(
        "1238229727513149533",
        `BUENOS DÍAS , PROCEDER CON LA REPARACION DE LA ODT **${odt}**  \nORDEN DE COMPRA: ${
          req.body.ordenCompra
        } \nCOTIZACION : ${req.body.cotizacion} \nAPROBADA POR: ${
          token(req).name
        }`
      );
      logger(token(req).username , odt , "SE APRUEBA ODT")
    } else if (req.body.estadoPlanta == "NO PROCEDE") {
      bot.enviarMensaje(
        "1238229727513149533",
        `BUENOS DÍAS , ALISTAR LA ODT:  **${odt}** DEVOLVER A CLIENTE , **NO PROCEDE**`
      );
      logger(token(req).username , odt , "NO PROCEDE ODT")
    }
    await aprobacionToUpdate.save();
    res.redirect("/aprobaciones");
  }
};

module.exports = controller;
