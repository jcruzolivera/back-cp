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

//Auth
router.post("/login", authController.login);
router.post("/register", authController.register);

//Usuarios
router.get("/usuarios", authMiddleware, usuarioControlador.findAll);
router.get("/usuarios/:id", authMiddleware, usuarioControlador.findOne);
router.put("/usuarios/:id", authMiddleware, usuarioControlador.update);
router.post("/usuarios", usuarioControlador.create);
router.delete("/usuarios/:id", authMiddleware, usuarioControlador.delete);

//Roles
router.get("/rol", rolControlador.findAll);
router.get("/rol/:id", rolControlador.findOne);
router.put("/rol/:id", rolControlador.update);
router.post("/rol", rolControlador.create);
router.delete("/rol/:id", rolControlador.delete);

//Compañia
router.get("/compania", companiaControlador.findAll);
router.get("/compania/:id", companiaControlador.findOne);
router.put("/compania/:id", companiaControlador.update);
router.post("/compania", companiaControlador.create);
router.delete("/compania/:id", companiaControlador.delete);

//Referencia
router.get("/referencia", referenciaControlador.findAll);
router.get("/referencia/:id", referenciaControlador.findOne);
router.put("/referencia/:id", referenciaControlador.update);
router.post("/referencia", referenciaControlador.create);
router.delete("/referencia/:id", referenciaControlador.delete);

//Proyecto
router.get("/proyecto", proyectoControlador.findAll);
router.get("/proyecto/:id", proyectoControlador.findOne);
router.put("/proyecto/:id", proyectoControlador.update);
router.post("/proyecto", proyectoControlador.create);
router.delete("/proyecto/:id", proyectoControlador.delete);

//Operacion
router.get("/operacion", operacionControlador.findAll);
router.get("/operacion/:id", operacionControlador.findOne);
router.put("/operacion/:id", operacionControlador.update);
router.post("/operacion", operacionControlador.create);
router.delete("/operacion/:id", operacionControlador.delete);

//Locacion
router.get("/locacion", locacionControlador.findAll);
router.get("/locacion/:id", locacionControlador.findOne);
router.put("/locacion/:id", locacionControlador.update);
router.post("/locacion", locacionControlador.create);
router.delete("/locacion/:id", locacionControlador.delete);

//Item
router.get("/item", itemControlador.findAll);
router.get("/item/:id", itemControlador.findOne);
router.put("/item/:id", itemControlador.update);
router.post("/item", itemControlador.create);
router.delete("/item/:id", itemControlador.delete);

//Cronograma
router.get("/cronograma", cronogramaControlador.findAll);
router.get("/cronograma/:id", cronogramaControlador.findOne);
router.put("/cronograma/:id", cronogramaControlador.update);
router.post("/cronograma", cronogramaControlador.create);
router.delete("/cronograma/:id", cronogramaControlador.delete);
router.put("/cronogramaItems/:id", cronogramaControlador.updateCronograma);
router.post("/generarCronogramasMesActual", generarCronogramaController.generarCronogramasMesActual);

//Dia Cronograma
router.get("/dia-cronograma", diaCronogramaControlador.findAll);
router.get("/dia-cronograma/:id", diaCronogramaControlador.findOne);
router.put("/dia-cronograma/:id", diaCronogramaControlador.update);
router.post("/dia-cronograma", diaCronogramaControlador.create);
router.delete("/dia-cronograma/:id", diaCronogramaControlador.delete);

//Accion
router.get("/accion", accionControlador.findAll);
router.get("/accion/:id", accionControlador.findOne);
router.put("/accion/:id", accionControlador.update);
router.post("/accion", accionControlador.create);
router.delete("/accion/:id", accionControlador.delete);


module.exports = router;
