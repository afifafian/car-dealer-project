const Sequelize = require("sequelize");
const UserModel = require("../../models/sequelize/userModel");
const CarModel = require("../../models/sequelize/carModel");
const CartModel = require("../../models/sequelize/cartModel");

const dbName = process.env.DB_NAME || "backend-test";
const dbPwd = process.env.DB_PWD || "postgres";
const dbUser = process.env.DB_USER || "postgres";

const sequelize = new Sequelize(dbName, dbUser, dbPwd, {
  host: "localhost",
  dialect: 'postgres',
  port: 5432,
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
