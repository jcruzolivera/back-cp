const db = require('../models');
const Rol = db.Rol;

// Crear un nuevo rol
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoRol = await Rol.create({ nombre });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el rol', error });
  }
};

// Obtener todos los roles
exports.findAll = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener roles', error });
  }
};

// Obtener un rol por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    res.json(rol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el rol', error });
  }
};

// Actualizar un rol por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    await rol.update({ nombre });

    res.json({ mensaje: 'Rol actualizado correctamente', rol });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el rol', error });
  }
};

// Eliminar un rol por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    await rol.destroy();

    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el rol', error });
  }
};
