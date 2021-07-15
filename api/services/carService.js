const { Car } = require("../config/db/sequelize");
const FormCar = require("../dto/request/formCar");
const getCurrentDate = require("../helpers/currentDate");
const converter = require("../helpers/currencyConverter");
const _ = require("lodash");

class CarServices {
  static async findAll() {
    try {
      const findAllCars = await Car.findAll({
        where: {
          deleted_at: null
        }
      });

      return findAllCars;

    } catch (err) {
      throw err;
    }
  }

  static async detail(car_id) {
    try {
      const findCarDetail = await Car.findOne({
        where: {
          car_id,
          deleted_at: null
        }
      });

      if (_.isEmpty(findCarDetail)) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Car data is not found!`,
        };
      }

      return findCarDetail;

    } catch (err) {
      throw err;
    }
  }

  static async create(carData) {
    try {
      const inputData = new FormCar();

      delete inputData.updated_at;
      
      Object.keys(inputData).forEach((key) => {
        if (carData.hasOwnProperty(key)) {
          if (!_.isEmpty(carData[key])) {
            inputData[key] = carData[key];
          }
        }
      });

      inputData.created_at = getCurrentDate().timestampNow;

      const createNewCar = await Car.create(inputData);
      
      return {
        carID: createNewCar.car_id,
        carType: createNewCar.car_type,
        carBrand: createNewCar.car_brand,
        carColor: createNewCar.car_color,
        productionYear: createNewCar.production_year,
        price: converter(createNewCar.price),
        stock: createNewCar.stock
      };

    } catch (err) {
      throw err;
    }
  }

  static async update(car_id, carData) {
    try {

      await this.detail(car_id);

      const inputData = new FormCar();

      delete inputData.created_at;

      Object.keys(inputData).forEach((key) => {
        if (carData.hasOwnProperty(key)) {
          if (!_.isEmpty(carData[key])) {
            inputData[key] = carData[key];
          }
        }
      });

      inputData.updated_at = getCurrentDate().timestampNow;

      const updateCar = await Car.update(inputData, {
        where: { car_id }
      });
      
      return updateCar;

    } catch (err) {
      throw err;
    }
  }

  static async softDelete(car_id) {
    try {

      await this.detail(car_id);

      const softDeleteCar = await Car.update(
        {
          deleted_at: getCurrentDate().timestampNow
        },
        {
          where: { car_id }
        }
      );

      return softDeleteCar;

    } catch (err) {
      throw err;
    }
  }
}

module.exports = CarServices;
