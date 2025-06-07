const db = require('../models');
const Locacion = db.Locacion;

// Crear una nueva locación
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaLocacion = await Locacion.create({ nombre });
    res.status(201).json(nuevaLocacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la locación', error });
  }
};

// Obtener todas las locaciones
exports.findAll = async (req, res) => {
  try {
    const locaciones = await Locacion.findAll();
    res.json(locaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las locaciones', error });
  }
};

// Obtener una locación por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const locacion = await Locacion.findByPk(id);

    if (!locacion) {
      return res.status(404).json({ mensaje: 'Locación no encontrada' });
    }

    res.json(locacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la locación', error });
  }
};

// Actualizar una locación por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const locacion = await Locacion.findByPk(id);

    if (!locacion) {
      return res.status(404).json({ mensaje: 'Locación no encontrada' });
    }

    await locacion.update({ nombre });

    res.json({ mensaje: 'Locación actualizada correctamente', locacion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la locación', error });
  }
};

// Eliminar una locación por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const locacion = await Locacion.findByPk(id);

    if (!locacion) {
      return res.status(404).json({ mensaje: 'Locación no encontrada' });
    }

    await locacion.destroy();

    res.json({ mensaje: 'Locación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la locación', error });
  }
};
