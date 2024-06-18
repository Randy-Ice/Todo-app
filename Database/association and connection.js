const logger = require("../Log/winston");
const sequelize = require("./db");
const Todo = require("../Models/todoModel");
const User = require("../Models/userModel");
Todo.belongsTo(User);
User.hasMany(Todo);

const Connection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connected successfully");
  } catch (err) {
    logger.error(err.message);
  }
};
module.exports = Connection;
