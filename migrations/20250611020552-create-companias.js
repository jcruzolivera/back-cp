"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "companias",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nombre: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fechaCreacion: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        fechaBaja: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        timestamps: false, // así Sequelize no espera timestamps
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("companias");
  },
};
