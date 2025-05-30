const express = require('express');
const router = express.Router();
const controlador = require('../controllers/usuario.controller');

router.get('/usuarios', controlador.obtenerUsuarios);
router.post('/usuarios', controlador.crearUsuario);

module.exports = router;
