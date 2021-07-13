const { User } = require("../config/db/sequelize");
const FormUser = require("../dto/request/formUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

class UserServices {
  static async create(userData) {
    try {
      const inputData = new FormUser();
      
      Object.keys(inputData).forEach((key) => {
        if (userData.hasOwnProperty(key)) {
          if (!_.isEmpty(userData[key])) {
            inputData[key] = userData[key];
          }
        }
      });

      if (!_.isEmpty(inputData.password)) {
        inputData.password = bcrypt.hashSync(inputData.password, 10);
      }

      const register = await User.create(inputData);
      
      return {
        firstName: register.firstname,
        lastName: register.lastname,
        email: register.email,
        username: register.username,
        phoneNumber: register.phone_number,
        address: register.address
      };

    } catch (err) {
      throw err;
    }
  }

  static async login(loginData) {
    try {

      if (_.isEmpty(loginData.username) 
        || _.isEmpty(loginData.password)) 
      {
        throw {
          name: "Custom_Error",
          status: 400,
          message: `Please fill username and password field!`,
        };
      }

      const userData = await User.findOne({
        where: {
          username: loginData.username
        }
      });

      if (_.isEmpty(userData)) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Can't find account with username: ${loginData.username}`,
        };
      }

      if (!bcrypt.compareSync(loginData.password, userData.password)) {
        throw {
          name: "Custom_Error",
          status: 400,
          message: `Wrong input password!`,
        };
      }

      const tokenPayload = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        user_type: userData.user_type
      };

      const token = jwt.sign(tokenPayload, 
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_TOKENLIFE
        }
      );

      return token;

    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserServices;
