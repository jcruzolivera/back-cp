module.exports = (sequelize, DataTypes) => {
  const Cronograma = sequelize.define(
    "Cronograma",
    {
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
      },
      proyectoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "proyectos",
          key: "id",
        },
      },
      mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      osr: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "activo", // podés cambiar el valor por defecto o quitarlo
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "cronogramas",
      timestamps: false,
    }
  );

  return Cronograma;
};
