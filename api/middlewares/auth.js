const jwt = require("jsonwebtoken");
const { Cart } = require("../config/db/sequelize");

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if(!token) {
      throw {
        name: "Custom_Error",
        status: 400,
        message: `Invalid Token data!`
      };
    }

    const decodedJWT = jwt.verify(token, process.env.JWT_KEY);

    req.userData = decodedJWT;

    next();

  } catch (err) {
    next(err)
  }
};

const adminAccess = (req, res, next) => {
  try {
    if (req.userData.user_type === "Admin") {
      next();
    } else {
      throw {
        name: "Custom_Error",
        status: 403,
        message: "Forbidden access!"
      };
    }

  } catch (err) {
    next(err)
  }
};

const limitedAccess = async (req, res, next) => {
  try {
    if (req.userData.user_type !== "Admin") {
      const { cartID } = req.params;
      
      const findCartOwner = await Cart.findOne({
        where: {
          id: cartID
        }
      });

      if (!findCartOwner) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Cart data is not found!`
        };
      }

      if (+findCartOwner.user_id !== +req.userData.id ) {
        throw {
          name: "Custom_Error",
          status: 403,
          message: "Forbidden access!"
        };
      }

      next();

    } else {
      throw {
        name: "Custom_Error",
        status: 403,
        message: "Forbidden access!"
      };
    }

  } catch (err) {
    next(err)
  }
};

module.exports = {
  authentication,
  adminAccess,
  limitedAccess
};
