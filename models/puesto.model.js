module.exports = (sequelize, DataTypes) => {
  const Puesto = sequelize.define(
    "Puesto",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Puesto",
      tableName: "puestos",
      timestamps: false,
    }
  );

  return Puesto;
};
