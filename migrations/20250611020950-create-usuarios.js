"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "usuarios",
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
        puesto: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        correo: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        documento: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        legajo: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        telefono: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        clave: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        anoIngreso: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        fechaCreacion: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        fechaBaja: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        companiaId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "companias",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        rolId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "roles",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      {
        timestamps: false, // así Sequelize no espera timestamps
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuarios");
  },
};
