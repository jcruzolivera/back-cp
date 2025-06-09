const db = require("../models");
const Referencia = db.Referencia;

// Crear una nueva referencia
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaReferencia = await Referencia.create({ nombre });
    return res.status(201).json(nuevaReferencia);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al crear la referencia", error });
  }
};

// Obtener todas las referencias
exports.findAll = async (req, res) => {
  try {
    const referencias = await Referencia.findAll();
    return res.json(referencias);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener las referencias", error });
  }
};

// Obtener una referencia por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const referencia = await Referencia.findByPk(id);

    if (!referencia) {
      return res.status(404).json({ mensaje: "Referencia no encontrada" });
    }

    return res.json(referencia);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al obtener la referencia", error });
  }
};

// Actualizar una referencia por ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    const referencia = await Referencia.findByPk(id);

    if (!referencia) {
      return res.status(404).json({ mensaje: "Referencia no encontrada" });
    }

    await referencia.update({ nombre });

    return res.json({
      mensaje: "Referencia actualizada correctamente",
      referencia,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al actualizar la referencia", error });
  }
};

// Eliminar una referencia por ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const referencia = await Referencia.findByPk(id);

    if (!referencia) {
      return res.status(404).json({ mensaje: "Referencia no encontrada" });
    }

    await referencia.destroy();

    return res.json({ mensaje: "Referencia eliminada correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al eliminar la referencia", error });
  }
};
