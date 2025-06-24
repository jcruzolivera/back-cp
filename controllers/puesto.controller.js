const db = require("../models");
const Puesto = db.Puesto;

exports.create = async (req, res) => {
  try {
    const nuevoPuesto = await Puesto.create(req.body);
    res.status(201).json(nuevoPuesto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el puesto", error });
  }
};

exports.findAll = async (req, res) => {
  try {
    const puestos = await Puesto.findAll();
    res.json(puestos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los puestos", error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const puesto = await Puesto.findByPk(id);
    if (!puesto) {
      return res.status(404).json({ mensaje: "Puesto no encontrado" });
    }
    res.json(puesto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el puesto", error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const puesto = await Puesto.findByPk(id);
    if (!puesto) {
      return res.status(404).json({ mensaje: "Puesto no encontrado" });
    }
    await puesto.update(req.body);
    res.json({ mensaje: "Puesto actualizado correctamente", puesto });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el puesto", error });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const puesto = await Puesto.findByPk(id);
    if (!puesto) {
      return res.status(404).json({ mensaje: "Puesto no encontrado" });
    }
    await puesto.destroy();
    res.json({ mensaje: "Puesto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el puesto", error });
  }
};
