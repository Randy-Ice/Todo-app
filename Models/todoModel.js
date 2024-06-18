const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Todo = sequelize.define("todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
module.exports = Todo;
