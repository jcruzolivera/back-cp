"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("cronogramas", [
      {
        usuarioId: 1,
        proyectoId: 1,
        mes: 6,
        anio: 2025,
        osr: "OSR001",
        estado: "activo",
        fechaCreacion: new Date(),
      },
      {
        usuarioId: 2,
        proyectoId: 2,
        mes: 7,
        anio: 2025,
        osr: "OSR002",
        estado: "activo",
        fechaCreacion: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("cronogramas", null, {});
  },
};
