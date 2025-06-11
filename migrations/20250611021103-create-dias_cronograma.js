"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "dias_cronograma",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        cronogramaId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "cronogramas",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        accionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "acciones",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        locacionId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "locaciones", // ojo que la tabla es locaciones, no locacion
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        dia: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        observacion: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: false, // así Sequelize no espera timestamps
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("dias_cronograma");
  },
};
