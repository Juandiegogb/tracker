const token = require("../tools/tokenGetter");
const controller = {};
const matriz = require("../models/matriz");

controller.s = async (req, res) => {
  const info = token(req).rol;
  const data = await matriz.findAll({
    where: { "ESTADO PLANTA": "APROBADO" },
    raw: true,
  });
  let estados = data.map((item) => item["ESTADO PROCESO EN PLANTA"]);
  estados = new Set(estados);
  estados = Array.from(estados);
  res.render("ingenieria/planeacion", { data, estados, info });
};

module.exports = controller;
