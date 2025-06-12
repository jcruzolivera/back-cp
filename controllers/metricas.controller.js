const db = require("../models");
const { Op } = require("sequelize");

function fechaToParts(fechaStr) {
  const fecha = new Date(fechaStr);
  return {
    anio: fecha.getFullYear(),
    mes: fecha.getMonth() + 1, // meses van de 0 a 11 en JS
    dia: fecha.getDate(),
  };
}

async function obtenerDiasTrabajadosVsDescanso(req, res) {
  try {
    const { compania, operario, fechaInicio, fechaFin } = req.query;

    if (!compania || !operario || !fechaInicio || !fechaFin) {
      return res.status(400).json({ error: "Faltan parámetros obligatorios" });
    }

    // Verifico que el usuario pertenece a la compañía
    const usuario = await db.Usuario.findOne({
      where: { id: operario, companiaId: compania },
    });

    if (!usuario) {
      return res
        .status(404)
        .json({ error: "Operario no encontrado en la compañía" });
    }

    const fechaIni = fechaToParts(fechaInicio);
    const fechaFinPartes = fechaToParts(fechaFin);

    // Buscar cronogramas en rango de años y meses
    // Consideramos que el rango puede cruzar años y meses
    // Para simplificar: buscamos cronogramas con anio entre fechaIni.anio y fechaFin.anio
    // y luego filtramos meses dependiendo del año

    const cronogramas = await db.Cronograma.findAll({
      where: {
        usuarioId: operario,
        [Op.and]: [
          { anio: { [Op.gte]: fechaIni.anio } },
          { anio: { [Op.lte]: fechaFinPartes.anio } },
        ],
      },
      include: {
        model: db.DiaCronograma,
        as: "dias",
        include: {
          model: db.Accion,
          as: "accion",
          attributes: ["nombre"],
        },
      },
    });

    // Filtrar días que estén dentro del rango de fechas exacto
    let diasTrabajados = 0;
    let diasDescanso = 0;

    cronogramas.forEach((cronograma) => {
      cronograma.dias.forEach((dia) => {
        // Construir fecha completa
        const fechaDia = new Date(cronograma.anio, cronograma.mes - 1, dia.dia);

        const fechaIniObj = new Date(fechaInicio);
        const fechaFinObj = new Date(fechaFin);

        if (fechaDia >= fechaIniObj && fechaDia <= fechaFinObj) {
          if (dia.accion && dia.accion.nombre.toLowerCase() === "trabajo") {
            diasTrabajados++;
          } else if (
            dia.accion &&
            dia.accion.nombre.toLowerCase() === "descanso"
          ) {
            diasDescanso++;
          }
        }
      });
    });

    return res.json({
      operario,
      compania,
      fechaInicio,
      fechaFin,
      diasTrabajados,
      diasDescanso,
    });
  } catch (error) {
    console.error("Error en obtenerDiasTrabajadosVsDescanso:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { obtenerDiasTrabajadosVsDescanso };
