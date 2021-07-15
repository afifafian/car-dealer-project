const converter = require("../../../helpers/currencyConverter");

class CarResponse{
    constructor(data = {}){
        if(Object.keys(this).length > 0){
            Object.keys(this).forEach(key=>{
                if(data[key] != undefined){
                    this[key] = data[key];
                }
            })
        }
    }
    carID = null;
    carType = "";
    carColor = "";
    carBrand = "";
    carCreated = null;
    carUpdated = null;
    production_year = null;
    price = 0;
    stock = 0;
    
    setCarResponse(data = {} ){
        this.carID = data.car_id;
        this.carType = data.car_type;
        this.carBrand = data.car_brand;
        this.carColor = data.car_color;
        this.production_year = data.production_year;
        this.price = converter(data.price);
        this.stock = data.stock;
        this.carCreated = data.created_at;
        this.carUpdated = data.updated_at;
    }
}

module.exports = CarResponse;
