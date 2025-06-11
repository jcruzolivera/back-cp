"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "cronogramas",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        usuarioId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "usuarios",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        proyectoId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "proyectos",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        mes: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        anio: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        osr: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        estado: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "activo",
        },
        fechaCreacion: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        timestamps: false, // así Sequelize no espera timestamps
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cronogramas");
  },
};
