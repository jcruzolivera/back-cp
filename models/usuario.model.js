module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Usuario",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      puesto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      documento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      legajo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clave: {
        type: DataTypes.STRING,
      },
      anoIngreso: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
      },
      fechaBaja: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      companiaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "companias",
          key: "id",
        },
      },
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      tableName: "usuarios",
      timestamps: false, // desactiva createdAt y updatedAt automáticos
    }
  );
};
