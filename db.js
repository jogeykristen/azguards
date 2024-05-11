const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo", "root", "Password123##", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .sync()
  .then(() => {
    console.log("Models synced with database successfully");
  })
  .catch((error) => {
    console.error("Unable to sync models with database:", error);
  });

module.exports = sequelize;
