const now = new Date();

function fecha(time = null) {
  const año = now.getFullYear();
  const mes = (now.getMonth() + 1).toString().padStart(2, "0");
  const día = now.getDate().toString().padStart(2, "0");
  let fecha = `${año}-${mes}-${día}`;

  if (time == true) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    fecha = fecha+ "   " + String(now.toLocaleTimeString("es-ES", options));
    return fecha;
  }

  return fecha;
}

module.exports = fecha;
