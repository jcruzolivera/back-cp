module.exports = (sequelize, DataTypes) => {
  const Compania = sequelize.define(
    "Compania",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fechaBaja: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "companias",
      timestamps: false, // desactiva createdAt y updatedAt automáticos
    }
  );

  return Compania;
};
