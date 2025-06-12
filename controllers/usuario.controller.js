const db = require("../models");
const Usuario = db.Usuario;
const Rol = db.Rol;
const Compania = db.Compania;

// Crear un nuevo usuario
exports.create = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el usuario", error });
  }
};

// Obtener todos los usuarios
exports.findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los usuarios", error });
  }
};

// Obtener todos los operarios
exports.findAllOperarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: Rol,
          as: "rol", // Asegúrate de que el alias coincida con tu modelo
          where: { nombre: "Operario" }, // Filtrar por rol "Operario"
          attributes: ["nombre"],
        },
        {
          model: Compania,
          as: "compania", // Asegúrate de que el alias coincida con tu modelo
          attributes: ["nombre"], // O todos los campos si preferís
        },
      ],
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ mensaje: "Error al obtener los operarios", error });
  }
};

// Obtener un usuario por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      include: [
        {
          model: Rol,
          as: "rol", // Asegúrate de que el alias coincida con tu modelo
          attributes: ["nombre"],
        },
        {
          model: Compania,
          as: "compania", // Asegúrate de que el alias coincida con tu modelo
          attributes: ["nombre"], // O todos los campos si preferís
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el usuario", error });
  }
};

// Actualizar un usuario por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    console.log("Usuario encontrado:", usuario);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Campos permitidos para actualizar
    const {
      nombre,
      legajo,
      puesto,
      companiaId,
      correo,
      anoIngreso,
      domicilio,
      documento,
      telefono,
    } = req.body;

    console.log("Usuario actualizado");

    // Opcional: validar si la compañía existe
    if (companiaId) {
      const compania = await Compania.findByPk(companiaId);
      if (!compania) {
        return res.status(400).json({ mensaje: "Compañía no válida" });
      }
    }
    console.log("Usuario actualizado 2 ");

    await usuario.update({
      nombre,
      legajo,
      puesto,
      companiaId,
      correo,
      anoIngreso,
      domicilio,
      documento,
      telefono,
    });
    console.log("Usuario actualizado 3");

    res.json({ mensaje: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ mensaje: "Error al actualizar el usuario", error });
  }
};

// Dar de baja lógica a un usuario por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Baja lógica: colocar la fecha de hoy en fechaBaja
    await usuario.update({
      fechaBaja: new Date(),
    });

    res.json({ mensaje: "Usuario dado de baja correctamente" });
  } catch (error) {
    console.error("Error al dar de baja el usuario:", error);
    res.status(500).json({ mensaje: "Error al dar de baja el usuario", error });
  }
};

exports.getUsuariosPorCompania = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarios = await Usuario.findAll({
      where: {
        companiaId: id,
        fechaBaja: null, // Solo usuarios activos
      },
      attributes: ["id", "nombre", "legajo"],
      order: [["nombre", "ASC"]],
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios de la compañía:", error);
    res.status(500).json({ mensaje: "Error al obtener usuarios" });
  }
};

const { Cronograma } = require("../models");

exports.getTimesheetsPorUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const timesheets = await Cronograma.findAll({
      where: {
        usuarioId: id,
      },
      attributes: ["id", "mes", "anio", "fechaCreacion"],
      order: [
        ["anio", "DESC"],
        ["mes", "DESC"],
      ],
    });

    res.json(timesheets);
  } catch (error) {
    console.error("Error al obtener timesheets del usuario:", error);
    res.status(500).json({ mensaje: "Error al obtener las hojas de tiempo" });
  }
};
