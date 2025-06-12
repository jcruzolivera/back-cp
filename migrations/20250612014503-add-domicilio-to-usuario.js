'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'domicilio', {
      type: Sequelize.STRING,
      allowNull: true, // O false si querés que sea obligatorio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'domicilio');
  }
};
