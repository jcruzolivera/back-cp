"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("puestos", [
      {
        nombre: "Gerente de Proyecto",
        descripcion:
          "Responsable de la planificación y ejecución de proyectos.",
      },
      {
        nombre: "Consultor",
        descripcion: "Brinda asesoramiento profesional a clientes.",
      },
      {
        nombre: "Analista",
        descripcion: "Analiza requerimientos y procesos de negocio.",
      },
      {
        nombre: "Desarrollador",
        descripcion: "Desarrolla e implementa soluciones de software.",
      },
      {
        nombre: "Diseñador UX/UI",
        descripcion:
          "Diseña interfaces centradas en la experiencia de usuario.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("puestos", null, {});
  },
};
