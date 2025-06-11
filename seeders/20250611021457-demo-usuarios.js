"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("usuarios", [
      {
        nombre: "Juan Pérez",
        puesto: "Gerente",
        correo: "juan.perez@example.com",
        documento: "12345678",
        legajo: 1001,
        telefono: "555-1234",
        clave: "hashedpassword",
        anoIngreso: 2015,
        fechaCreacion: new Date(),
        fechaBaja: null,
        companiaId: 1,
        rolId: 1,
      },
      {
        nombre: "Ana Gómez",
        puesto: "Analista",
        correo: "ana.gomez@example.com",
        documento: "87654321",
        legajo: 1002,
        telefono: "555-5678",
        clave: "hashedpassword",
        anoIngreso: 2018,
        fechaCreacion: new Date(),
        fechaBaja: null,
        companiaId: 2,
        rolId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
