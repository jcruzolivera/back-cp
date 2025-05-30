const { Sequelize } = require("sequelize");
const config = require("../config/config").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos aquí, por ejemplo:
db.Usuario = require("./usuario.model")(sequelize, Sequelize);
db.Compania = require("./compania.model")(sequelize, Sequelize);
db.Rol = require("./rol.model")(sequelize, Sequelize);
db.Cronograma = require("./cronograma.model")(sequelize, Sequelize);
db.DiaCronograma = require("./diacronograma.model")(sequelize, Sequelize);
db.Accion = require("./accion.model")(sequelize, Sequelize);
db.Locacion = require("./locacion.model")(sequelize, Sequelize);
db.Proyecto = require("./proyecto.model")(sequelize, Sequelize);
db.Item = require("./item.model")(sequelize, Sequelize);
db.Operacion = require("./operacion.model")(sequelize, Sequelize);
db.Referencia = require("./referencia.model")(sequelize, Sequelize);

// Usuario - Compañia
db.Compania.hasMany(db.Usuario, {
  foreignKey: "companiaId",
  as: "usuarios",
});

db.Usuario.belongsTo(db.Compania, {
  foreignKey: "companiaId",
  as: "compania",
});

// Usuario - Rol
db.Rol.hasMany(db.Usuario, {
  foreignKey: "rolId",
  as: "usuarios",
});
db.Usuario.belongsTo(db.Rol, {
  foreignKey: "rolId",
  as: "rol",
});

//Usuario - Cronograma
// Usuario tiene muchos cronogramas
db.Usuario.hasMany(db.Cronograma, {
  foreignKey: "usuarioId",
  as: "cronogramas",
});
db.Cronograma.belongsTo(db.Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

// Cronograma tiene muchos días
db.Cronograma.hasMany(db.DiaCronograma, {
  foreignKey: "cronogramaId",
  as: "dias",
});
db.DiaCronograma.belongsTo(db.Cronograma, {
  foreignKey: "cronogramaId",
  as: "cronograma",
});

// Relación: DiaCronograma pertenece a una Accion
db.Accion.hasMany(db.DiaCronograma, {
  foreignKey: "accionId",
  as: "dias",
});
db.DiaCronograma.belongsTo(db.Accion, {
  foreignKey: "accionId",
  as: "accion",
});

// Relación: DiaCronograma pertenece a una Locacion
db.Locacion.hasMany(db.DiaCronograma, {
  foreignKey: "locacionId",
  as: "dias",
});
db.DiaCronograma.belongsTo(db.Accion, {
  foreignKey: "locacionId",
  as: "locacion",
});

// Proyecto tiene muchos cronogramas
db.Proyecto.hasMany(db.Cronograma, {
  foreignKey: "proyectoId",
  as: "cronogramas",
});
db.Cronograma.belongsTo(db.Proyecto, {
  foreignKey: "proyectoId",
  as: "proyecto",
});

// Cronograma tiene muchos Items
db.Cronograma.hasMany(db.Item, {
  foreignKey: "cronogramaId",
  as: "items",
});
db.Item.belongsTo(db.Cronograma, {
  foreignKey: "cronogramaId",
  as: "cronograma",
});

module.exports = db;
