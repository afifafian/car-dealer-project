const Sequelize = require("sequelize");
const UserModel = require("../../models/sequelize/userModel");
const CarModel = require("../../models/sequelize/carModel");
const CartModel = require("../../models/sequelize/cartModel");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//MODEL DEFINITION
const User = UserModel(sequelize, Sequelize);
const Car = CarModel(sequelize, Sequelize);
const Cart = CartModel(sequelize, Sequelize);

//MODEL RELATIONSHIP
Cart.belongsTo(User, {
  foreignKey: "user_id"
});
Cart.belongsTo(Car, {
  foreignKey: "car_id"
});

User.hasMany(Cart, {
  sourceKey: "id",
  foreignKey: "user_id"
});
Car.hasMany(Cart, {
  sourceKey: "car_id",
  foreignKey: "car_id"
});

module.exports = {
  User,
  Car,
  Cart
};
