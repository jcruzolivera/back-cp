const db = require('../models');
const Accion = db.Accion;

// Crear una nueva acción
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaAccion = await Accion.create({ nombre });
    res.status(201).json(nuevaAccion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la acción', error });
  }
};

// Obtener todas las acciones
exports.findAll = async (req, res) => {
  try {
    const acciones = await Accion.findAll();
    res.json(acciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las acciones', error });
  }
};

// Obtener una acción por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const accion = await Accion.findByPk(id);

    if (!accion) {
      return res.status(404).json({ mensaje: 'Acción no encontrada' });
    }

    res.json(accion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la acción', error });
  }
};

// Actualizar una acción por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const accion = await Accion.findByPk(id);

    if (!accion) {
      return res.status(404).json({ mensaje: 'Acción no encontrada' });
    }

    await accion.update({ nombre });

    res.json({ mensaje: 'Acción actualizada correctamente', accion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la acción', error });
  }
};

// Eliminar una acción por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const accion = await Accion.findByPk(id);

    if (!accion) {
      return res.status(404).json({ mensaje: 'Acción no encontrada' });
    }

    await accion.destroy();

    res.json({ mensaje: 'Acción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la acción', error });
  }
};
