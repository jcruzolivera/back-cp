"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("referencias", [
      { nombre: "Referencia 1" },
      { nombre: "Referencia 2" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("referencias", null, {});
  },
};
