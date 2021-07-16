const Sequelise = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelise.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelise.INTEGER
});

module.exports = CartItem;
