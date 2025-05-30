module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      cronogramaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cronogramas",
          key: "id",
        },
      },
      well: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      network: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wbs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "items",
      timestamps: false,
    }
  );

  return Item;
};
