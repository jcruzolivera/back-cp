const express = require("express");
const router = express.Router();

//Middlewares
const authMiddleware = require("../middlewares/auth.middleware");

// Controladores
const usuarioControlador = require("../controllers/usuario.controller");
const rolControlador = require("../controllers/rol.controller");
const authController = require("../controllers/auth.controller");
const companiaControlador = require("../controllers/compania.controller");
const referenciaControlador = require("../controllers/referencia.controller");
const proyectoControlador = require("../controllers/proyecto.controller");
const operacionControlador = require("../controllers/operacion.controller");
const locacionControlador = require("../controllers/locacion.controller");
const itemControlador = require("../controllers/item.controller");
const cronogramaControlador = require("../controllers/cronograma.controller");
const diaCronogramaControlador = require("../controllers/diaCronograma.controller");
const accionControlador = require("../controllers/accion.controller");
const generarCronogramaController = require("../controllers/generarcronograma.controller");
const metricasController = require("../controllers/metricas.controller");
const puestoControlador = require("../controllers/puesto.controller");

//Auth
router.post("/login", authController.login);
router.post("/register", authController.register);

//Usuarios
router.get("/usuarios", authMiddleware, usuarioControlador.findAll);
router.get("/usuarios/:id", authMiddleware, usuarioControlador.findOne);
router.get(
  "/verOperarios",
  authMiddleware,
  usuarioControlador.findAllOperarios
);
router.put("/usuarios/:id", authMiddleware, usuarioControlador.update);
router.post("/usuarios", authMiddleware, usuarioControlador.create);
router.delete("/usuarios/:id", authMiddleware, usuarioControlador.delete);
router.get("/compania/:id/usuarios", usuarioControlador.getUsuariosPorCompania);
router.get(
  "/usuarios/:id/timesheets",
  usuarioControlador.getTimesheetsPorUsuario
);
router.post(
  "/usuarios/cargar-masivos",
  authMiddleware,
  usuarioControlador.importarOperarios
);

//Roles
router.get("/rol", rolControlador.findAll);
router.get("/rol/:id", rolControlador.findOne);
router.put("/rol/:id", authMiddleware, rolControlador.update);
router.post("/rol", authMiddleware, rolControlador.create);
router.delete("/rol/:id", authMiddleware, rolControlador.delete);

//Compañia
router.get("/compania", companiaControlador.findAll);
router.get("/compania/:id", companiaControlador.findOne);
router.put("/compania/:id", authMiddleware, companiaControlador.update);
router.post("/compania", authMiddleware, companiaControlador.create);
router.delete("/compania/:id", authMiddleware, companiaControlador.delete);

//Referencia
router.get("/referencia", referenciaControlador.findAll);
router.get("/referencia/:id", referenciaControlador.findOne);
router.put("/referencia/:id", authMiddleware, referenciaControlador.update);
router.post("/referencia", authMiddleware, referenciaControlador.create);
router.delete("/referencia/:id", authMiddleware, referenciaControlador.delete);

//Proyecto
router.get("/proyecto", proyectoControlador.findAll);
router.get("/proyecto/:id", proyectoControlador.findOne);
router.put("/proyecto/:id", authMiddleware, proyectoControlador.update);
router.post("/proyecto", authMiddleware, proyectoControlador.create);
router.delete("/proyecto/:id", authMiddleware, proyectoControlador.delete);

//Operacion
router.get("/operacion", operacionControlador.findAll);
router.get("/operacion/:id", operacionControlador.findOne);
router.put("/operacion/:id", authMiddleware, operacionControlador.update);
router.post("/operacion", authMiddleware, operacionControlador.create);
router.delete("/operacion/:id", authMiddleware, operacionControlador.delete);

//Locacion
router.get("/locacion", locacionControlador.findAll);
router.get("/locacion/:id", locacionControlador.findOne);
router.put("/locacion/:id", authMiddleware, locacionControlador.update);
router.post("/locacion", authMiddleware, locacionControlador.create);
router.delete("/locacion/:id", authMiddleware, locacionControlador.delete);

//Puesto
router.get("/puesto", puestoControlador.findAll);
router.get("/puesto/:id", puestoControlador.findOne);
router.put("/puesto/:id", authMiddleware, puestoControlador.update);
router.post("/puesto", authMiddleware, puestoControlador.create);
router.delete("/puesto/:id", authMiddleware, puestoControlador.delete);

//Item
router.get("/item", authMiddleware, itemControlador.findAll);
router.get("/item/:id", authMiddleware, itemControlador.findOne);
router.put("/item/:id", authMiddleware, itemControlador.update);
router.post("/item", authMiddleware, itemControlador.create);
router.delete("/item/:id", authMiddleware, itemControlador.delete);

//Cronograma
router.get("/cronograma", authMiddleware, cronogramaControlador.findAll);
router.get("/cronograma/:id", authMiddleware, cronogramaControlador.findOne);
router.put("/cronograma/:id", authMiddleware, cronogramaControlador.update);
router.post("/cronograma", authMiddleware, cronogramaControlador.create);
router.delete("/cronograma/:id", authMiddleware, cronogramaControlador.delete);
router.put(
  "/cronogramaItems/:id",
  authMiddleware,
  cronogramaControlador.updateCronograma
);
router.post(
  "/generarCronogramasMesActual",
  authMiddleware,
  generarCronogramaController.generarCronogramasMesActual
);

//Dia Cronograma
router.get("/dia-cronograma", authMiddleware, diaCronogramaControlador.findAll);
router.get(
  "/dia-cronograma/:id",
  authMiddleware,
  diaCronogramaControlador.findOne
);
router.put(
  "/dia-cronograma/:id",
  authMiddleware,
  diaCronogramaControlador.update
);
router.post("/dia-cronograma", authMiddleware, diaCronogramaControlador.create);
router.delete(
  "/dia-cronograma/:id",
  authMiddleware,
  diaCronogramaControlador.delete
);

//Accion
router.get("/accion", accionControlador.findAll);
router.get("/accion/:id", accionControlador.findOne);
router.put("/accion/:id", authMiddleware, accionControlador.update);
router.post("/accion", authMiddleware, accionControlador.create);
router.delete("/accion/:id", authMiddleware, accionControlador.delete);

//Metricas
router.get(
  "/metricas",
  authMiddleware,
  metricasController.obtenerDiasTrabajadosVsDescanso
);

module.exports = router;
