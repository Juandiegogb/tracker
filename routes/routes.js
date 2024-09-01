const multer = require("multer");
const express = require("express");
const r = express.Router();
const paC = require("../controllers/paC");
const lC = require("../controllers/lC");
const hC = require("../controllers/hC");
const cC = require("../controllers/cC");
const a = require("../controllers/aC");
const pC = require("../controllers/pC");
const mC = require("../controllers/mC");
const iC = require("../controllers/iC");
const fs = require("fs");
const path = require("path");
const gc = require("../controllers/gC");

const fotosOdt = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../public/uploads/fotos");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uFotos = multer({ storage: fotosOdt });

const planos = multer.diskStorage({
  destination: (req, file, cb) => {
    const odt = req.body.odt;
    const uploadPath = path.join(__dirname, "../public/uploads/planos", odt);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uPlanos = multer({ storage: planos });

r.post("/planos", uPlanos.array("planos", 10), (req, res, next) => {
  mC.file(req, res, (err) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send("Files uploaded successfully");
  });
});

// Sección login
r.get("/", lC.serve);
r.post("/login", lC.auth);

// Sección home
r.get("/home", hC.init);

// Sección comercial
r.get("/aprobaciones", paC.getData);
r.post("/aproRefresh", paC.actualizar);

// Sección ingeniería
r.get("/revision", iC.r);
r.post("/diagRefresh", iC.rU);
r.get("/planeacion", iC.p);
r.post("/buscarOdt", iC.gD);
r.post("/tareas", iC.gT);
r.post("/planeacionFecha", iC.fU);
r.get("/ingenieria", iC.ai);
r.post("/formato", iC.ft);
r.get("/buscador", iC.b);
r.get("/historial", iC.h);

// Sección compras
r.get("/liquidaciones", cC.serve);

r.post("/actualizarFecha", cC.aFS);
r.post("/liqRefresh", cC.rL);

// Sección almacén
r.get("/almacen", a.init);
r.post("/almacenRefresh", a.refresh);
r.get("/solicitarOdt", a.initODT);
r.post("/crearOdt", uFotos.single("fotografias"), a.solicitarOdt);
r.get("/entregas", a.eInit);
r.post("/entregadoCliente", a.e);

// Sección planta
r.get("/planta", pC.initEnsamble);
r.post("/diagnosticoTerminado", pC.diagnosticoTerminado);
r.post("/ensambleTerminado", pC.ensambleTerminado);
r.post("/pruebasTerminado", pC.pruebasTerminado);
r.post("/terminado", pC.terminado);

// Sección mecanizado
r.get("/mecanizado", mC.init);
r.get("/supervisorMecanizado", mC.sM);

// Sección general

r.post("/mecanizado/fechaUpdate", mC.fU);

//seccion gerencia
r.get("/gerencia", gc.s);

module.exports = r;
