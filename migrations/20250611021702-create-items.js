"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "items",
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
          onDelete: "RESTRICT",
        },
        well: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        network: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        wbs: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pad: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        operacion: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: false, // así Sequelize no espera timestamps
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("items");
  },
};
