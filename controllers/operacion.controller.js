const db = require('../models');
const Operacion = db.Operacion;

// Crear una nueva operación
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaOperacion = await Operacion.create({ nombre });
    res.status(201).json(nuevaOperacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la operación', error });
  }
};

// Obtener todas las operaciones
exports.findAll = async (req, res) => {
  try {
    const operaciones = await Operacion.findAll();
    res.json(operaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las operaciones', error });
  }
};

// Obtener una operación por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const operacion = await Operacion.findByPk(id);

    if (!operacion) {
      return res.status(404).json({ mensaje: 'Operación no encontrada' });
    }

    res.json(operacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la operación', error });
  }
};

// Actualizar una operación por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const operacion = await Operacion.findByPk(id);

    if (!operacion) {
      return res.status(404).json({ mensaje: 'Operación no encontrada' });
    }

    await operacion.update({ nombre });

    res.json({ mensaje: 'Operación actualizada correctamente', operacion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la operación', error });
  }
};

// Eliminar una operación por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const operacion = await Operacion.findByPk(id);

    if (!operacion) {
      return res.status(404).json({ mensaje: 'Operación no encontrada' });
    }

    await operacion.destroy();

    res.json({ mensaje: 'Operación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la operación', error });
  }
};
