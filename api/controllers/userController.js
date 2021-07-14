const UserService = require("../services/userService");

class UserControllers {
  static async reister(req, res, next) {
    try {
      const userData = req.body;
      const registerUser = await UserService.create(userData);

      return res.status(201).json({
        message: "Successfully registered new user!",
        data: registerUser,
        request: {
          type: "POST",
          url: "/users/register"
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const loginData = req.body;
      const getAccessToken = await UserService.login(loginData);

      return res.status(200).json({
        message: "Successfully login!",
        token: getAccessToken,
        request: {
          type: "POST",
          url: "/users/login"
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async findAll(req, res, next) {
    try {
      const fetchUsers = await UserService.findAll();

      return res.status(200).json({
        message: "Successfully fetch users data!",
        results: fetchUsers,
        request: {
          type: "GET",
          url: "/users"
        }
      });

    } catch (err) {
      next(err)
    }
  }

}

module.exports = UserControllers;
