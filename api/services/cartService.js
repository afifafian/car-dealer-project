const { Op } = require("sequelize");
const { Cart, User, Car } = require("../config/db/sequelize");
const FormCart = require("../dto/request/formCart");
const getCurrentDate = require("../helpers/currentDate");
const converter = require("../helpers/currencyConverter");
const _ = require("lodash");

class CartServices {
  static async findAll(userData) {
    try {
      const whereCondition = {
        deleted_at: null,
        "$car.deleted_at$": null
      };

      if (userData.user_type !== "Admin") {
        Object.assign(whereCondition, {
          "$user.id$": userData.id
        });
      }

      const findAllCart = await Cart.findAll({
        where: whereCondition,
        include: [
          {
            model: User,
            attributes: { exclude: [
              "password", "created_at", "updated_at"
            ]}
          },
          {
            model: Car,
            attributes: { exclude: [
              "created_at", "updated_at", "deleted_at"
            ]}
          }
        ]
      });

      return findAllCart.map(item => {
        return {
          bookingID: item.id,
          status: item.status,
          customerName: item.user.username,
          carPrice: converter(+item.car.price),
          carType: item.car.car_type,
          carBrand: item.car.car_brand,
          carColor: item.car.car_color,
          quantity: item.quantity,
          cost: converter(+item.cost)
        };
      });

    } catch (err) {
      throw err;
    }
  }

  static async detail(cartID, userData) {
    try {

      const whereCondition = {
        id: cartID,
        deleted_at: null
      };

      if (userData.user_type !== "Admin") {
        Object.assign(whereCondition, {
          user_id: userData.id
        });
      }

      const findDetailCart = await Cart.findOne({
        where: whereCondition,
        include: [{ model: Car }]
      });

      if (_.isEmpty(findDetailCart)) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Cart data is not found!`,
        };
      }

      return findDetailCart;

    } catch (err) {
      throw err;
    }
  }

  static async checkStock(car_id) {
    try {
      const checkStock = await Car.findOne({
        where: {
          [Op.and]: {
            car_id,
            deleted_at: null,
            stock: { [Op.gt]: 0 }            
          }
        }
      });

      if (_.isEmpty(checkStock)) {
        throw {
          name: "Custom_Error",
          status: 400,
          message: "Sorry, the car you have selected is not available!"
        };
      }

      return checkStock;

    } catch (err) {
      throw err;
    }
  }

  static async create(cartData, userData) {
    try {

      const inputData = new FormCart();
      delete inputData.updated_at;

      Object.keys(inputData).forEach((key) => {
        if (cartData.hasOwnProperty(key)) {
          if (!_.isEmpty(cartData[key].toString())) {
            inputData[key] = cartData[key];
          }
        }
      });

      if (userData.user_type !== "Admin") {
        inputData.user_id = userData.id;
      }

      const availableCar = await this.checkStock(inputData.car_id);

      if (+availableCar.stock < +inputData.quantity) {
        throw {
          name: "Custom_Error",
          status: 400,
          message: "Quantity can not exceeded car's stock!"
        };
      }
      
      inputData.status = "on-going";
      inputData.cost = inputData.quantity*availableCar.price;
      inputData.created_at = getCurrentDate().timestampNow;

      const createNewCart = await Cart.create(inputData);

      return createNewCart;

    } catch (err) {
      throw err;
    }
  }

  static async update(cartID, cartData, userData) {
    try {
      await this.detail(cartID, userData);
      
      const inputData = new FormCart();
      delete inputData.created_at;

      Object.keys(inputData).forEach((key) => {
        if (cartData.hasOwnProperty(key)) {
          if (!_.isEmpty(cartData[key].toString())) {
            inputData[key] = cartData[key];
          }
        }
      });

      if (userData.user_type !== "Admin") {
        inputData.user_id = userData.id;
      }

      const availableCar = await this.checkStock(inputData.car_id);

      if (+availableCar.stock < +inputData.quantity) {
        throw {
          name: "Custom_Error",
          status: 400,
          message: "Quantity can not exceeded car's stock!"
        };
      }
      
      inputData.cost = inputData.quantity*availableCar.price;
      inputData.updated_at = getCurrentDate().timestampNow;
      
      const updateCart = await Cart.update(inputData, {
        where: {
          id: cartID
        }
      });

      return updateCart;

    } catch (err) {
      throw err;
    }
  }

  static async softDelete(cartID, userData) {
    try {
      await this.detail(cartID, userData);

      const softDeleteCart = await Cart.update(
        {
          deleted_at: getCurrentDate().timestampNow,
          status: "canceled"
        },
        {
          where: {
            id: cartID
          }
        }
      );

      return softDeleteCart;
      
    } catch (err) {
      throw err;
    }
  }

  static async delete(cartID, userData) {
    try {
      await this.detail(cartID, userData);

      const deleteCart = await Cart.destroy({
        where: {
          id: cartID
        }
      });

      return deleteCart;

    } catch (err) {
      throw err;
    }
  }

  static async checkOut(cartID, paymentAmount, userData) {
    try {
      const detailCart = await this.detail(cartID, userData);

      if (detailCart.status === "success") {
        throw {
          name: "Custom_Error",
          status: 400,
          message: "This cart is already checked out!"
        };
      }

      if (+paymentAmount < +detailCart.cost) {
        throw {
          name: "Custom_Error",
          status: 400,
          message: `Insufficient payment amount!`,
        };
      }

      await Car.decrement('stock', {
        by: detailCart.quantity,
        where: { car_id: detailCart.car_id }
      });

      await Cart.update(
        {
          status: "success",
          updated_at: getCurrentDate().timestampNow
        },
        {
          where: { id: cartID }
        }
      );

      return {
        price: converter(+detailCart.car.price),
        quantity: detailCart.quantity,
        totalCost: converter(+detailCart.cost),
        yourPayment: converter(+paymentAmount),
        exchange: converter(+paymentAmount - +detailCart.cost)
      };

    } catch (err) {
      throw err;
    }
  }
}

module.exports = CartServices;
