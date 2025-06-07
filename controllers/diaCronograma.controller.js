const db = require('../models');
const DiaCronograma = db.DiaCronograma;

// Crear un nuevo Día de Cronograma
exports.create = async (req, res) => {
  try {
    const nuevoDia = await DiaCronograma.create(req.body);
    res.status(201).json(nuevoDia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el día del cronograma', error });
  }
};

// Obtener todos los días del cronograma
exports.findAll = async (req, res) => {
  try {
    const dias = await DiaCronograma.findAll();
    res.json(dias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los días del cronograma', error });
  }
};

// Obtener un día del cronograma por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const dia = await DiaCronograma.findByPk(id);

    if (!dia) {
      return res.status(404).json({ mensaje: 'Día del cronograma no encontrado' });
    }

    res.json(dia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el día del cronograma', error });
  }
};

// Actualizar un día del cronograma
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const dia = await DiaCronograma.findByPk(id);

    if (!dia) {
      return res.status(404).json({ mensaje: 'Día del cronograma no encontrado' });
    }

    await dia.update(req.body);

    res.json({ mensaje: 'Día del cronograma actualizado correctamente', dia });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el día del cronograma', error });
  }
};

// Eliminar un día del cronograma
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const dia = await DiaCronograma.findByPk(id);

    if (!dia) {
      return res.status(404).json({ mensaje: 'Día del cronograma no encontrado' });
    }

    await dia.destroy();

    res.json({ mensaje: 'Día del cronograma eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el día del cronograma', error });
  }
};
