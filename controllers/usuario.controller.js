const db = require("../models");
const bcrypt = require("bcrypt");

const Usuario = db.Usuario;
const Rol = db.Rol;
const Compania = db.Compania;
const Puesto = db.Puesto;

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
        {
          model: Puesto,
          as: "puestoAlias", // Asegúrate de que el alias coincida con tu modelo
          attributes: ["nombre"],
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
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Extraemos los campos del cuerpo del request
    const {
      nombre,
      legajo,
      puestoId, // ← Nuevo campo para la relación
      companiaId,
      correo,
      anoIngreso,
      domicilio,
      documento,
      telefono,
    } = req.body;

    // Validación opcional: verificar si la compañía existe
    if (companiaId) {
      const compania = await Compania.findByPk(companiaId);
      if (!compania) {
        return res.status(400).json({ mensaje: "Compañía no válida" });
      }
    }

    // Validación opcional: verificar si el puesto existe (si se envió)
    if (puestoId) {
      const puesto = await db.Puesto.findByPk(puestoId);
      if (!puesto) {
        return res.status(400).json({ mensaje: "Puesto no válido" });
      }
    }

    // Actualización
    await usuario.update({
      nombre,
      legajo,
      puestoId, // ← Guardamos el nuevo puesto
      companiaId,
      correo,
      anoIngreso,
      domicilio,
      documento,
      telefono,
    });

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

exports.importarOperarios = async (req, res) => {
  const operarios = req.body;

  if (!Array.isArray(operarios) || operarios.length === 0) {
    return res
      .status(400)
      .json({ mensaje: "No se proporcionaron operarios válidos" });
  }

  try {
    const usuariosFinales = [];

    for (const op of operarios) {
      // Validar campos obligatorios
      if (!op.nombre || !op.correo || !op.documento) continue;

      // Revisar si ya existe por correo
      const existente = await Usuario.findOne({ where: { correo: op.correo } });

      // Encriptar clave (usando documento)
      const claveHasheada = await bcrypt.hash(op.documento.toString(), 10);

      const usuarioData = {
        ...op,
        clave: claveHasheada,
        fechaCreacion: new Date(),
        rolId: 2, // por ejemplo, rol "operario"
        companiaId: 1, // podés ajustarlo si lo sacás del token o parámetro
      };

      if (existente) {
        // Actualizar datos del existente (excepto clave, que no cambiamos)
        await Usuario.update(usuarioData, { where: { correo: op.correo } });
      } else {
        // Nuevo usuario
        usuariosFinales.push(usuarioData);
      }
    }

    // Crear todos los nuevos de una vez
    const createdOperarios = await Usuario.bulkCreate(usuariosFinales);

    res.status(201).json({
      mensaje: `Operarios creados: ${createdOperarios.length}`,
      creados: createdOperarios,
    });
  } catch (error) {
    console.error("Error al importar operarios:", error);
    res.status(500).json({ mensaje: "Error al importar los operarios", error });
  }
};
