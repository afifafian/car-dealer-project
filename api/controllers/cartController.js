const CartServices = require("../services/cartService");

class CartControllers {
  static async get(req, res, next) {
    try {
      const userData = req.userData;

      const fetchCart = await CartServices.findAll(userData);

      return res.status(200).json({
        message: "Successfully fetch cart data!",
        results: fetchCart,
        request: {
          type: "GET",
          url: "/cart"
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async detail(req, res, next) {
    try {
      const { cartID } = req.params;

      const detailCart = await CartServices.detail(cartID);

      return res.status(200).json({
        message: "Successfully fetch detail cart data!",
        result: detailCart,
        request: {
          type: "GET",
          url: `/cart/${cartID}`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const cartData = req.body;
      const userData = req.userData;
      const createCart = await CartServices.create(cartData, userData);

      return res.status(201).json({
        message: "Successfully added new item to cart!",
        data: createCart,
        request: {
          type: "POST",
          url: "/cart"
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const { cartID } = req.params;
      const cartData = req.body;

      const updateCart = await CartServices.update(cartID, cartData);

      return res.status(200).json({
        message: "Successfully updated cart data!",
        totalUpdated: updateCart[0],
        request: {
          type:"PUT",
          url: `/cart/${cartID}`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async softDelete(req, res, next) {
    try {
      const { cartID } = req.params;

      const softDeleteCart = await CartServices.softDelete(cartID);

      return res.status(200).json({
        message: "Successfully deleted cart data!",
        totalDeleted: softDeleteCart[0],
        request: {
          type: "PATCH",
          url: `/cart/${cartID}`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async destroy(req, res, next) {
    try {
      const { cartID } = req.params;

      const deleteCart = await CartServices.delete(cartID);

      return res.status(200).json({
        message: "Successfully deleted cart data!",
        totalDeleted: deleteCart,
        request: {
          type: "DELETE",
          url: `/cart/${cartID}`
        }
      })

    } catch (err) {
      throw err;
    }
  }

  static async checkOut(req, res, next) {
    try {
      const { cartID } = req.params;
      const { payment_amount } = req.body;

      const checkOutCart = await CartServices.checkOut(cartID, payment_amount);

      return res.status(200).json({
        message: "Payment success!",
        detailPayment: checkOutCart,
        request: {
          type: "PATCH",
          url: `/cart/check-out/${cartID}`
        }
      });

    } catch (err) {
      next(err);
    }
  }

}

module.exports = CartControllers;
