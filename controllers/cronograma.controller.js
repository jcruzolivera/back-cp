const db = require("../models");
const Cronograma = db.Cronograma;
const DiaCronograma = db.DiaCronograma;
const Item = db.Item;
const Proyecto = db.Proyecto;
const Accion = db.Accion;
const Locacion = db.Locacion;
const Usuario = db.Usuario;
const Compania = db.Compania;

// Crear un nuevo cronograma
exports.create = async (req, res) => {
  try {
    const nuevoCronograma = await Cronograma.create(req.body);
    res.status(201).json(nuevoCronograma);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el cronograma", error });
  }
};

// Obtener todos los cronogramas
exports.findAll = async (req, res) => {
  try {
    const cronogramas = await Cronograma.findAll();
    res.json(cronogramas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cronogramas", error });
  }
};

// Obtener un cronograma por ID con sus días asociados
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const cronograma = await Cronograma.findByPk(id, {
      include: [
        {
          model: DiaCronograma,
          as: "dias", // Usá el alias si lo definiste así
          include: [
            {
              model: Accion,
              as: "accion", // Asegúrate de que el alias coincida con tu modelo
            },
            {
              model: Locacion,
              as: "locacion", // Asegúrate de que el alias coincida con tu modelo
            },
          ],
        },
        {
          model: Item,
          as: "items", // Asegúrate de que el alias coincida con tu modelo
        },
        {
          model: Proyecto,
          as: "proyecto", // Asegúrate de que el alias coincida con tu modelo
        },
        {
          model: Usuario,
          as: "usuario", // Asegúrate de que el alias coincida con tu modelo
          include: [
            {
              model: Compania,
              as: "compania", // Asegúrate de que el alias coincida con tu modelo
            },
          ],
        },
      ],
    });

    if (!cronograma) {
      return res.status(404).json({ mensaje: "Cronograma no encontrado" });
    }

    res.json(cronograma);
  } catch (error) {
    console.error("Error al obtener el cronograma:", error);
    res.status(500).json({ mensaje: "Error al obtener el cronograma", error });
  }
};

// Actualizar un cronograma
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const cronograma = await Cronograma.findByPk(id);

    if (!cronograma) {
      return res.status(404).json({ mensaje: "Cronograma no encontrado" });
    }

    await cronograma.update(req.body);

    res.json({ mensaje: "Cronograma actualizado correctamente", cronograma });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar el cronograma", error });
  }
};

// Eliminar un cronograma
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const cronograma = await Cronograma.findByPk(id);

    if (!cronograma) {
      return res.status(404).json({ mensaje: "Cronograma no encontrado" });
    }

    await cronograma.destroy();

    res.json({ mensaje: "Cronograma eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el cronograma", error });
  }
};

exports.updateCronograma = async (req, res) => {
  const { id } = req.params;
  const { dias, items } = req.body;

  console.log("Datos recibidos para actualizar cronograma:", { id, dias, items });

  const t = await db.sequelize.transaction();

  try {
    const cronograma = await Cronograma.findByPk(id, { transaction: t });

    if (!cronograma) {
      await t.rollback();
      return res.status(404).json({ mensaje: "Cronograma no encontrado" });
    }

    // Actualizar DÍAS
    for (const dia of dias) {
      await DiaCronograma.update(
        {
          accionId: dia.accionId || null,
          observacion: dia.observacion || null,
          locacionId: dia.locacionId || null,
        },
        {
          where: { id: dia.id },
          transaction: t,
        }
      );
    }

    // Eliminar todos los items anteriores
    await Item.destroy({
      where: { cronogramaId: id },
      transaction: t,
    });

    // Crear nuevos items
    for (const item of items) {
      await Item.create(
        {
          cronogramaId: id,
          well: item.well,
          operacion: item.operacion,
          network: item.network,
          wbs: item.wbs,
          pad: item.pad,
        },
        { transaction: t }
      );
    }

    await t.commit();
    return res.json({ mensaje: "Cronograma actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el cronograma:", error);
    await t.rollback();
    return res
      .status(500)
      .json({ mensaje: "Error al actualizar el cronograma", error });
  }
};
