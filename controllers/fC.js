const controller = {};
const modelActividades = require("../models/modelActividades");
const token = require("../tools/tokenGetter");

controller.getData = async (req, res) => {
  const data = await modelFacturar.findAll({
    attributes: ["ODT", "CLIENTE", "DETALLE", "N_FACTURA", "N_REMISION"],
    order: [["ODT", "DESC"]],
  });
  res.render("test", { data });
};

controller.actulizar = async (req, res) => {
  const odt = req.body.odt;
  const remision = req.body.remision;
  const factura = req.body.factura;
  const facturaToUpdate = await modelFacturar.findOne({ where: { ODT: odt } });
  facturaToUpdate.N_FACTURA = factura;
  facturaToUpdate.N_REMISION = remision;
  await facturaToUpdate.save();
  const descripcion =
    "Se actualizo factura a : " + factura + " y remision a : " + remision;
  await modelActividades.create({
    odt: odt,
    descripcion: descripcion,
    area: "Facturacion",
  });
  res.redirect("/");
};

module.exports = controller;
