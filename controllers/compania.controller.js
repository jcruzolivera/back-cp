const db = require('../models');
const Compania = db.Compania;

// Crear una nueva compañía
exports.create = async (req, res) => {
  try {
    const { nombre, fechaCreacion, fechaBaja } = req.body;

    const nuevaCompania = await Compania.create({
      nombre,
      fechaCreacion,
      fechaBaja: fechaBaja || null
    });

    res.status(201).json(nuevaCompania);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la compañía', error });
  }
};

// Obtener todas las compañías
exports.findAll = async (req, res) => {
  try {
    const companias = await Compania.findAll();
    res.json(companias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las compañías', error });
  }
};

// Obtener una compañía por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const compania = await Compania.findByPk(id);

    if (!compania) {
      return res.status(404).json({ mensaje: 'Compañía no encontrada' });
    }

    res.json(compania);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la compañía', error });
  }
};

// Actualizar una compañía por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fechaCreacion, fechaBaja } = req.body;

    const compania = await Compania.findByPk(id);

    if (!compania) {
      return res.status(404).json({ mensaje: 'Compañía no encontrada' });
    }

    await compania.update({
      nombre,
      fechaCreacion,
      fechaBaja
    });

    res.json({ mensaje: 'Compañía actualizada correctamente', compania });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la compañía', error });
  }
};

// Eliminar una compañía por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const compania = await Compania.findByPk(id);

    if (!compania) {
      return res.status(404).json({ mensaje: 'Compañía no encontrada' });
    }

    await compania.destroy();

    res.json({ mensaje: 'Compañía eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la compañía', error });
  }
};
