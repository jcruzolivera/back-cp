"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("companias", [
      {
        nombre: "Compañía A",
        fechaCreacion: new Date("2020-01-01"),
        fechaBaja: null,
      },
      {
        nombre: "Compañía B",
        fechaCreacion: new Date("2021-06-15"),
        fechaBaja: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("companias", null, {});
  },
};
