module.exports = (sequelize, DataTypes) => {
  const Referencia = sequelize.define(
    "Referencia",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "referencias",
      timestamps: false,
    }
  );

  return Referencia;
};
