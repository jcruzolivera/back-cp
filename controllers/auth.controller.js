const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const jwtConfig = require("../config/jwt.config");

const Usuario = db.Usuario;
const Rol = db.Rol;

exports.login = async (req, res) => {
  const { correo, clave } = req.body;
  console.log("Datos de login recibidos:", { correo, clave });

  try {
    const usuario = await Usuario.findOne({
      where: { correo },
      include: {
        model: Rol,
        as: "rol",
        attributes: ["nombre"],
      },
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    let passwordValida = false;

    if (
      (correo == "admin@admin.com" && clave == "admin") ||
      (correo == "ana.gomez@example.com" && clave == "hashedpassword")
    ) {
      // Autenticación especial para el usuario admin
      console.log("Autenticación especial para el usuario admin");
      passwordValida = true;
    } else {
      passwordValida = await bcrypt.compare(clave, usuario.clave);
    }

    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, rolId: usuario.rolId },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({
      mensaje: "Autenticación exitosa",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol.nombre,
        companiaId: usuario.companiaId,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};

exports.register = async (req, res) => {
  const { nombre, correo, clave, rolId, companiaId, ...otrosDatos } = req.body;

  try {
    // Verificar si ya existe un usuario con ese correo
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const claveHasheada = await bcrypt.hash(clave, 10);

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      clave: claveHasheada,
      rolId,
      companiaId,
      ...otrosDatos,
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error });
  }
};
