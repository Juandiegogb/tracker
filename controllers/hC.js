const controller = {};
const jwt = require("jsonwebtoken");

controller.init = async (req, res) => {
  const token = jwt.decode(req.cookies.token, process.env.secret);
  switch (token.rol) {
    case "comercial":
      res.redirect("/aprobaciones");
      break;
    case "developer":
      res.redirect("/revision");
      break;
    case "comprador":
      res.redirect("/liquidaciones");
      break;
    case "almacenista":
      const os = String(req.headers["user-agent"]);
      if (os.includes("Windows")) {
        res.redirect("/almacen");
        break;
      } else {
        res.redirect("/solicitarOdt");
        break;
      }
    case "supervisor":
      if (token.area == "mecanizado") {
        res.redirect("/supervisorMecanizado");
      } else {
        res.redirect("/planta");
      }
      break;
    case "dibujante":
      res.redirect("/mecanizado");
      break;
    case "coordinador":
      res.redirect("/planeacion");
      break;
    case "auxiliar":
      if (token.area == "ingenieria") {
        res.redirect("ingenieria");
      }
      break;
    case "gerente":
      res.redirect("gerencia");
      break;
    default:
      console.log("Opción no reconocida");
      res.redirect("/");
  }
};

module.exports = controller;
