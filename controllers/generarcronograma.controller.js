// controllers/cronogramaController.js

const { Usuario, Accion, Cronograma, DiaCronograma } = require("../models");

function diasDelMes(mes, anio) {
  return new Date(anio, mes, 0).getDate();
}

exports.generarCronogramasMesActual = async (req, res) => {
  try {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1; // Enero = 0, por eso +1
    const anio = hoy.getFullYear();

    const usuarios = await Usuario.findAll();
    const acciones = await Accion.findAll();

    const diasACrear = diasDelMes(mes, anio);

    let creados = 0;

    for (const usuario of usuarios) {
      const existe = await Cronograma.findOne({
        where: { usuarioId: usuario.id, mes, anio },
      });

      if (!existe) {
        const nuevoCronograma = await Cronograma.create({
          usuarioId: usuario.id,
          mes,
          anio,
          estado: "activo",
          fechaCreacion: new Date(),
        });

        const dias = [];

        for (let dia = 1; dia <= diasACrear; dia++) {
          for (const accion of acciones) {
            dias.push({
              cronogramaId: nuevoCronograma.id,
              accionId: accion.id,
              locacionId: null,
              dia,
              observacion: null,
            });
          }
        }

        await DiaCronograma.bulkCreate(dias);
        creados++;
      }
    }

    res.json({
      mensaje: `Se generaron ${creados} cronogramas para el mes ${mes}/${anio}`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error generando cronogramas", error: error.message });
  }
};
