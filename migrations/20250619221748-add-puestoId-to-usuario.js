"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("usuarios", "puestoId", {
      type: Sequelize.INTEGER,
      references: {
        model: "puestos",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("usuarios", "puestoId");
  },
};
