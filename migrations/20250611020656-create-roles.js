"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "roles",
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
          unique: true,
        },
      },
      {
        timestamps: false, // así Sequelize no espera timestamps
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("roles");
  },
};
