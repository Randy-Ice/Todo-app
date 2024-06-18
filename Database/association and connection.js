const logger = require("../Log/winston");
const sequelize = require("./db");

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
