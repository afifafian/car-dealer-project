const Sequelize = require("sequelize");
const UserModel = require("../../models/sequelize/userModel");
const CarModel = require("../../models/sequelize/carModel");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
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

const User = UserModel(sequelize, Sequelize);
const Car = CarModel(sequelize, Sequelize);

module.exports = {
  User,
  Car
};
