const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TodoItem = sequelize.define("TodoItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed"),
    allowNull: false,
  },
});

module.exports = TodoItem;
