module.exports = (sequelize, DataTypes) => {
  const Operacion = sequelize.define(
    "Operacion",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "operaciones",
      timestamps: false,
    }
  );

  return Operacion;
};
