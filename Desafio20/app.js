import express from "express";

import routers from "./routers/index.js";
import logger from "./utils/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routers);

// Ruta para loggear rutas invalidas
app.get("*", function (req, res) {
  logger.warn(`Ruta ${req.path} metodo GET`);
  res.status(404).send(`${req.path} not found`);
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json(error);
});

export default app;
