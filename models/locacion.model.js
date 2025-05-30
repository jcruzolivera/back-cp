module.exports = (sequelize, DataTypes) => {
  const Locacion = sequelize.define('Locacion', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'locaciones',
    timestamps: false
  });

  return Locacion;
};
