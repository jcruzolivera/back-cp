"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("dias_cronograma", [
      {
        cronogramaId: 1,
        accionId: 1,
        locacionId: 1,
        dia: 10,
        observacion: "Primera acción del mes",
      },
      {
        cronogramaId: 2,
        accionId: 2,
        locacionId: 2,
        dia: 15,
        observacion: "Segunda acción del mes",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("dias_cronograma", null, {});
  },
};
