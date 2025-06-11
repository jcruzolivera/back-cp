"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("locaciones", [
      {
        nombre: "Sucursal Norte",
      },
      { nombre: "Sucursal Sur" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("locaciones", null, {});
  },
};
