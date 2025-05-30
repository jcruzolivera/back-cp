module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define('Proyecto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'proyectos',
    timestamps: false
  });

  return Proyecto;
};
