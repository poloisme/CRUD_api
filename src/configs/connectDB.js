const { Sequelize } = require("sequelize");
const { development } = require("./config.json");

const { database, host, username, password, dialect, logging } = development;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  logging: logging,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
