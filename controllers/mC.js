const matriz = require("../models/matriz");
const controller = {};
const path = require("path");
const fs = require("fs");

controller.init = async (req, res) => {
  const data = await matriz.findAll({
    where: { "ESTADO PLANTA": "APROBADO" },
    raw: true,
  });
  res.render("planta/mecanizado", { data });
};

controller.fU = async (req, res) => {
  const odt = req.body.odt;
  const fToUpdate = await matriz.findOne({
    where: { ODT: odt },
    attributes: ["ODT", "MECANIZADO", "FECHA ENTREGA MECANIZADO"],
  });
  fToUpdate["MECANIZADO"] = req.body.mecanizado;
  fToUpdate["FECHA ENTREGA MECANIZADO"] = req.body.fecha;
  await fToUpdate.save();
  res.redirect("/mecanizado");
};

controller.file = async (req, res) => {
  const odt = req.body.odt;
  const odtData = await matriz.findOne({ where: { ODT: odt } });
  odtData["LISTO PARA MECANIZAR"] = req.body.listoMecanizado;
  await odtData.save();
  res.redirect("/mecanizado");
};

controller.sM = async (req, res) => {
  let data = await matriz.findAll({
    where: { "LISTO PARA MECANIZAR": "SI" },
    raw: true,
    attributes: [
      "ODT",
      "CLIENTE",
      "CLASIFICACION DEL EQUIPO",
      "LISTO PARA MECANIZAR",
    ],
  });
  const updatedData = await Promise.all(
    data.map(async (record) => {
      const odt = String(record.ODT);
      const folderPath = path.join(__dirname, "../public/uploads/planos", odt);
      if (fs.existsSync(folderPath)) {
        const files = fs
          .readdirSync(folderPath)
          .map((file) => path.join("/uploads/planos", odt, file));
        return {
          ...record,
          files: files,
        };
      } else {
        return {
          ...record,
          files: [],
        };
      }
    })
  );
  res.render("planta/supervisorMecanizado", { updatedData });
};
module.exports = controller;
