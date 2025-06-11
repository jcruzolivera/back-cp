"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("proyectos", [
      {
        nombre: "Proyecto Alpha",
      },
      { nombre: "Proyecto Beta" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("proyectos", null, {});
  },
};
