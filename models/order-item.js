const Sequelise = require("sequelize");

const sequelize = require("../util/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelise.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelise.INTEGER
});

module.exports = OrderItem;
