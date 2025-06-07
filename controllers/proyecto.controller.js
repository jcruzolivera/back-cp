const db = require('../models');
const Proyecto = db.Proyecto;

exports.create = async (req, res) => {
  try {
    const nuevoProyecto = await Proyecto.create(req.body);
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el proyecto', error });
  }
};

exports.findAll = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los proyectos', error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el proyecto', error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    await proyecto.update(req.body);
    res.json({ mensaje: 'Proyecto actualizado correctamente', proyecto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el proyecto', error });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const proyecto = await Proyecto.findByPk(id);
    if (!proyecto) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    await proyecto.destroy();
    res.json({ mensaje: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el proyecto', error });
  }
};
