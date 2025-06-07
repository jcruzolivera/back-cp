const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
// Controladores
const usuarioControlador = require("../controllers/usuario.controller");
const rolControlador = require("../controllers/rol.controller");

//Usuarios
router.get("/usuarios/:id", authMiddleware, usuarioControlador.findOne);
router.post("/usuarios", usuarioControlador.create);

//Roles
router.post("/rol", rolControlador.create);

module.exports = router;
