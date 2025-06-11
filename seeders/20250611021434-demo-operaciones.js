"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("operaciones", [
      { nombre: "Ingreso" },
      { nombre: "Egreso" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("operaciones", null, {});
  },
};
