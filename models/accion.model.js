module.exports = (sequelize, DataTypes) => {
  const Accion = sequelize.define('Accion', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'acciones',
    timestamps: false
  });

  return Accion;
};
