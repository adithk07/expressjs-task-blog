const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Programs = sequelize.define("program", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Programs.sync();
module.exports = Programs;
