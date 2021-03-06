const CartServices = require("../services/cartService");
const CartResponse = require("../dto/response/cart/cartResponse");

class CartControllers {
  static async get(req, res, next) {
    try {
      const userData = req.userData;

      const fetchCart = await CartServices.findAll(userData);
      
      const data = fetchCart.map(cart => {
        const response = new CartResponse();
        response.setCartResponse(cart);
        return response;
      });

      return res.status(200).json({
        message: "Successfully fetch cart data!",
        results: data,
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
      const userData = req.userData

      const detailCart = await CartServices.detail(cartID, userData);

      const response = new CartResponse();
      response.setCartResponse(detailCart);

      return res.status(200).json({
        message: "Successfully fetch detail cart data!",
        result: response,
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
      const userData = req.userData;

      const updateCart = await CartServices.update(cartID, cartData, userData);

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
      const userData = req.userData;

      const softDeleteCart = await CartServices.softDelete(cartID, userData);

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
      const userData = req.userData;

      const deleteCart = await CartServices.delete(cartID, userData);

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
      const userData = req.userData;

      const checkOutCart = await CartServices.checkOut(cartID, payment_amount, userData);

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
