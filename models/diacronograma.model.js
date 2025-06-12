module.exports = (sequelize, DataTypes) => {
  const DiaCronograma = sequelize.define(
    "DiaCronograma",
    {
      cronogramaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cronogramas",
          key: "id",
        },
      },
      accionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "acciones",
          key: "id",
        },
      },
      locacionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "locacion",
          key: "id",
        },
      },
      dia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "dias_cronograma",
      timestamps: false,
    }
  );

  return DiaCronograma;
};
