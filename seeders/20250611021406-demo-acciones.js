"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("acciones", [
      { nombre: "Crear" },
      { nombre: "Editar" },
      { nombre: "Eliminar" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("acciones", null, {});
  },
};
