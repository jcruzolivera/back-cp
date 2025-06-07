const db = require('../models');
const Item = db.Item;

// Crear un nuevo Item
exports.create = async (req, res) => {
  try {
    const nuevoItem = await Item.create(req.body);
    res.status(201).json(nuevoItem);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el item', error });
  }
};

// Obtener todos los Items
exports.findAll = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los items', error });
  }
};

// Obtener un Item por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ mensaje: 'Item no encontrado' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el item', error });
  }
};

// Actualizar un Item
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ mensaje: 'Item no encontrado' });
    }

    await item.update(req.body);

    res.json({ mensaje: 'Item actualizado correctamente', item });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el item', error });
  }
};

// Eliminar un Item
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ mensaje: 'Item no encontrado' });
    }

    await item.destroy();

    res.json({ mensaje: 'Item eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el item', error });
  }
};
