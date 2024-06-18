const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.SQL_DATABASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    dialect: "mysql",
  }
);
module.exports = sequelize;
