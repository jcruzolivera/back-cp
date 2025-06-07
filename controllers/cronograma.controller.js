const db = require('../models');
const Cronograma = db.Cronograma;

// Crear un nuevo cronograma
exports.create = async (req, res) => {
  try {
    const nuevoCronograma = await Cronograma.create(req.body);
    res.status(201).json(nuevoCronograma);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el cronograma', error });
  }
};

// Obtener todos los cronogramas
exports.findAll = async (req, res) => {
  try {
    const cronogramas = await Cronograma.findAll();
    res.json(cronogramas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener cronogramas', error });
  }
};

// Obtener un cronograma por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const cronograma = await Cronograma.findByPk(id);

    if (!cronograma) {
      return res.status(404).json({ mensaje: 'Cronograma no encontrado' });
    }

    res.json(cronograma);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el cronograma', error });
  }
};

// Actualizar un cronograma
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const cronograma = await Cronograma.findByPk(id);

    if (!cronograma) {
      return res.status(404).json({ mensaje: 'Cronograma no encontrado' });
    }

    await cronograma.update(req.body);

    res.json({ mensaje: 'Cronograma actualizado correctamente', cronograma });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el cronograma', error });
  }
};

// Eliminar un cronograma
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const cronograma = await Cronograma.findByPk(id);

    if (!cronograma) {
      return res.status(404).json({ mensaje: 'Cronograma no encontrado' });
    }

    await cronograma.destroy();

    res.json({ mensaje: 'Cronograma eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el cronograma', error });
  }
};
