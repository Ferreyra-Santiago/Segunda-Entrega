const mongoose = require("mongoose");
// exportamos mongoose y creamos la base de datos trayendo a RUTADB que es la URL  de la base de dato desde el .env

const dbMongoConnect = () => {
  const RUTADB = process.env.RUTA_DB;
  console.log(RUTADB)
  mongoose.set("strictQuery", true);

  mongoose.connect(RUTADB, (error) => {
    if (!error) {
      console.log("CONEXION EXITOSA");
    } else {
      console.log("ERROR DE CONEXION");
    }
  });
};

module.exports = dbMongoConnect();
