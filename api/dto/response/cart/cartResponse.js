const converter = require("../../../helpers/currencyConverter");

class CartResponse{
    constructor(data = {}){
        if(Object.keys(this).length > 0){
            Object.keys(this).forEach(key=>{
                if(data[key] != undefined){
                    this[key] = data[key];
                }
            })
        }
    }
    cartID = null;
    userID = null;
    carID = null;
    status = "";
    cartCreated = null;
    cartUpdated = null;
    carType = "";
    carColor = "";
    carBrand = "";
    production_year = null;
    carStock = 0;
    carPrice = 0;
    quantity = 0;
    cost = 0;
    
    setCartResponse(data = {} ){
        this.cartID = data.id;
        this.userID = data.user_id;
        this.carID = data.car_id;
        this.carType = data.car.car_type;
        this.carBrand = data.car.car_brand;
        this.carColor = data.car.car_color;
        this.production_year = data.car.production_year;
        this.carPrice = converter(data.car.price);
        this.carStock = data.car.stock;
        this.cartCreated = data.created_at;
        this.cartUpdated = data.updated_at;
        this.quantity = data.quantity;
        this.cost = converter(data.cost);
        this.status = data.status;
    }
}

module.exports = CartResponse;
