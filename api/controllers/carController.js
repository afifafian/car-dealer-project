const CarService = require("../services/carService");

class CarControllers {
  static async get(req, res, next) {
    try {
      const fetchCars = await CarService.findAll();

      return res.status(200).json({
        message: "Successfully fetch cars data!",
        results: fetchCars,
        request: {
          type: "GET",
          url: "/cars"
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async detail(req, res, next) {
    try {
      const car_id = req.params.carID;

      const getDetailCar = await CarService.detail(car_id);

      return res.status(200).json({
        message: "Successfully fetch detail car!",
        result: getDetailCar,
        request: {
          type: "GET",
          url: `/cars/${car_id}`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const carData = req.body;

      const createNewCar = await CarService.create(carData);

      return res.status(201).json({
        message: `Successfully create new Car!`,
        data: createNewCar,
        request: {
          type: "POST",
          url: `/cars`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const car_id = req.params.carID;

      const carData = req.body;

      const updateCar = await CarService.update(car_id, carData);

      return res.status(200).json({
        message: `Successfully updated Car with id: ${car_id}!`,
        totalUpdated: updateCar[0],
        request: {
          type: "PUT",
          url: `/cars/${car_id}`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async softDelete(req, res, next) {
    try {
      const car_id = req.params.carID;

      const softDeleteCar = await CarService.softDelete(car_id);

      return res.status(200).json({
        message: "Successfully deleted car data!",
        totalDeleted: softDeleteCar[0],
        request: {
          type: "PATCH",
          url: `/cars/${car_id}`
        }
      });

    } catch (err) {
      next(err)
    }
  }
}

module.exports = CarControllers;
