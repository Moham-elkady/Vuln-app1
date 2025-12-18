const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite"
});

const User = require("./user")(sequelize, DataTypes);
const Note = require("./note")(sequelize, DataTypes);

User.hasMany(Note);
Note.belongsTo(User);

module.exports = { sequelize, User, Note };