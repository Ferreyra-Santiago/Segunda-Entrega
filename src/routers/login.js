const express = require("express");
const login = express.Router();
const { userModel } = require("../models/user.model");

login.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send("login", `bienvenido por ${req.session.counter} vez`);
  } else {
    req.session.counter = 1;
    res.send("login", "bienvenido");
  }
});

login.get("/cleansession", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Error al cerrar sesion");
    } else {
      res.send("sesion Cerrada");
    }
  });
});

login.post("/registrar", async (req, res) => {
  const emailUser = req.body.email;
  const passwordUser = req.body.password;

  const nuevoUsaurio = await userModel.create({
    email: emailUser,
    password: passwordUser,
  });
  console.log(nuevoUsaurio);
  res.redirect("http://localhost:8080");
});

login.post("/login", async (req, res) => {
  const emailUser = req.body.email;
  const passwordUser = req.body.password;

  const nuevoUsaurio = await userModel.findOne({
    email: emailUser,
  });

  if (!nuevoUsaurio) {
    res.redirect("http://localhost:8080");
  } else {
    if (passwordUser !== nuevoUsaurio.password) {
      res.send("hubo un error");
    }
    else{
        res.redirect("http://localhost:8080/productos");
    }
  }
});

login.get("/rutaprivda", (req, res) => {
  res.send("Usuario autorizado y autenticado ");
});
module.exports = login;
