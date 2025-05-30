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
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      documento: {
        type: DataTypes.STRING,
      },
      legajo: {
        type: DataTypes.INTEGER,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      clave: {
        type: DataTypes.STRING,
      },
      anoIngreso: {
        type: DataTypes.INTEGER,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
      },
      fechaBaja: {
        type: DataTypes.DATE,
      },
      companiaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "companias",
          key: "id",
        },
      },
      rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
