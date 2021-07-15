# Car Dealer Project

This server side has :
- RESTful endpoint for User (Register, Login & find all Users (Admin only))
- RESTful endpoint for Booking Item/Car, full with transaction flow
- JSON formatted response
</br></br></br></br>

# Users RESTful endpoints:


## POST /users/register
Register to create a new account

- Request Header
```json
  not needed
```

- Request Body
```json
{
  "firstname": "<requested firstname>",
  "lastname": "<requested lastname>",
  "username": "<requested username>",
  "email": "<requested email>",
  "address": "<requested address>",
  "phone_number": "<requested phone number>",
  "user_type": "Normal",
  "password": "<requested password>",
}
```

- Response 201: Created
```json
{
  "message": "Successfully registered new user!",
  "data": {
    "firstName": "<saved firstname>",
    "lastName": "<saved lastname>",
    "email": "<saved email>",
    "username": "<saved username>",
    "phoneNumber": "<saved phone number>",
    "address": "<saved address>"
  },
  "request": {
    "type": "POST",
    "url": "/users/register"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Validation on request body!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## POST /users/login
login to user's account

- Request Header
```json
  not needed
```

- Request Body
```json
{
  "username": "<user username>",
  "password": "<user password>"
}
```

- Response 200: OK
```json
{
  "message": "Successfully login!",
  "token": "<access-token>",
  "request": {
    "type": "POST",
    "url": "/users/login"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Please fill username and password field!"
}
```

- Response 404: Bad Request
```json
{
  "message": "Can't find account with username: <user's username>"
}
```

- Response 401: Unauthorized
```json
{
  "message": "Wrong input password!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## GET /users/ (Admin Only)
fetch list of user data

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body
```json
{
  "username": "<user username>",
  "password": "<user password>"
}
```

- Response 200: OK
```json
{
  "message": "Successfully fetch users data!",
  "results": [
    {
      "id": "2",
      "email": "admin@mail.com",
      "username": "administrator",
      "firstname": "super",
      "lastname": "admin",
      "address": "Jl. Mahakam III",
      "phone_number": "0812345993",
      "user_type": "Admin"
    },
    {
      "id": "4",
      "email": "normal_user@mail.com",
      "username": "normaluser",
      "firstname": "normal",
      "lastname": "user",
      "address": "Jl. Boulevard Utara",
      "phone_number": "087173383234",
      "user_type": "Normal"
    },
    {
      "id": "5",
      "email": "john@mail.com",
      "username": "johndoe",
      "firstname": "John",
      "lastname": "Doe",
      "address": "Jl. Boulevard Selatan",
      "phone_number": "083417432234",
      "user_type": "Normal"
    }
  ],
  "request": {
    "type": "GET",
    "url": "/users"
  }
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```

</br></br></br></br>


# Car RESTful endpoints:


## GET /cars
Get all Car list

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```   

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully fetch cars data!",
  "results": [
    {
      "carID": "1",
      "carType": "SUV",
      "carBrand": "Toyota",
      "carPrice": "Rp 400.000.000,00"
    },
    {
      "carID": "5",
      "carType": "City Car",
      "carBrand": "Nissan",
      "carPrice": "Rp 350.000.000,00"
    },
    {
      "carID": "4",
      "carType": "City Car",
      "carBrand": "Mitsubishi",
      "carPrice": "Rp 250.000.000,00"
    }, 
  ],
  "request": {
    "type": "GET",
    "url": "/cars"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Invalid request"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## GET /cars/:carID
Get detail car data by requested params id

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully fetch detail car!",
  "result": {
    "car_id": "1",
    "car_type": "SUV",
    "car_color": "Black",
    "car_brand": "Toyota",
    "production_year": "2015",
    "price": "Rp 400.000.000,00",
    "stock": "200",
    "created_at": "2021-07-14T02:40:12.000Z",
    "updated_at": "2021-07-14T09:52:33.000Z",
    "deleted_at": null
  },
  "request": {
    "type": "GET",
    "url": "/cars/1"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Invalid Request"
}
```

- Response 404: Not Found
```json
{
  "message": "Car data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## POST /cars (Admin Only)
Create new Car

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
{
  "car_type": "Sport Car",
  "car_brand": "BMW",
  "car_color": "Black",
  "production_year": "2018",
  "price": "2500000000",
  "stock": "20",
}
```

- Response 201: Created
```json
{
  "message": "Successfully create new Car!",
  "data": {
    "carID": "7",
    "carType": "Sport Car",
    "carBrand": "BMW",
    "carColor": "Black",
    "productionYear": "2018",
    "price": "Rp 2.500.000.000,00",
    "stock": "20"
  },
  "request": {
    "type": "POST",
    "url": "/cars"
  }
}  
```

- Response 400: Bad Request
```json
{
  "message": "Validation on request body"
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```
</br>

## PUT /cars/:carID (Admin Only)
Update Car by requested param id

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
{
  "car_type": "Sport Car",
  "car_brand": "BMW",
  "car_color": "White",
  "production_year": "2018",
  "price": "2500000000",
  "stock": "22",
}
```

- Response 200: OK
```json
{
  "message": "Successfully updated Car with id: 7!",
  "totalUpdated": 1,
  "request": {
    "type": "PUT",
    "url": "/cars/7"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Validation on request body"
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Car data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## PATCH /cars/:carID (Admin Only)
Soft delete Car by requesed param id

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully deleted car data!",
  "totalDeleted": 1,
  "request": {
    "type": "PATCH",
    "url": "/cars/7"
  }
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Car data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
``` 
</br></br></br></br>

# Cart RESTful endpoints:


## GET /cart
Get list cart for a single user (Admin type can see all cart data, but
normal type can only see theirs)

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```   

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully fetch cart data!",
  "results": [
    {
      "bookingID": "4",
      "status": "on-going",
      "customerName": "johndoe",
      "carPrice": "Rp 400.000.000,00",
      "carType": "SUV",
      "carBrand": "Toyota",
      "carColor": "Black",
      "quantity": "2",
      "cost": "Rp 800.000.000,00"
    },
    {
      "bookingID": "1",
      "status": "on-going",
      "customerName": "normaluser",
      "carPrice": "Rp 400.000.000,00",
      "carType": "SUV",
      "carBrand": "Toyota",
      "carColor": "Black",
      "quantity": "1",
      "cost": "Rp 400.000.000,00"
    },
    {
      "bookingID": "7",
      "status": "success",
      "customerName": "johndoe",
      "carPrice": "Rp 200.000.000,00",
      "carType": "City Car",
      "carBrand": "Avanza",
      "carColor": "White",
      "quantity": "18",
      "cost": "Rp 3.600.000.000,00"
    }
  ],
  "request": {
    "type": "GET",
    "url": "/cars"
  }
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>


## GET /cart/:cartID
Get detail cart data by requested param id (Normal User can only see their own cart data detail)

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully fetch detail cart data!",
  "result": {
    "id": "2",
    "user_id": "4",
    "car_id": "3",
    "status": "on-going",
    "cost": "Rp. 400.000.000,00",
    "quantity": "2",
    "created_at": "2021-07-14T09:38:03.000Z",
    "updated_at": null,
    "deleted_at": null,
    "car": {
      "car_id": "3",
      "car_type": "City Car",
      "car_color": "White",
      "car_brand": "Toyota",
      "production_year": "2019",
      "price": "Rp 200.000.000,00",
      "stock": "482",
      "created_at": "2021-07-14T14:00:05.000Z",
      "updated_at": null,
      "deleted_at": null
    }
  },
  "request": {
    "type": "GET",
    "url": "/cart/2"
  }
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Cart data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## POST /cart
Added new item/car into cart (Admin can added item to any user's cart, but Normal user can only added new item into their own cart)

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
{
  "car_id": "<selected car's id>", //required
  "quantity": "<quantity requested>", // (Minimum is 1)
  "user_id": "<selected user's id>", // (Only if logged in as an Admin type)
}
```

- Response 201: Created
```json
{
  "message": "Successfully added new item to cart!",
  "data": {
    "id": "10",
    "user_id": "5",
    "car_id": "7",
    "status": "on-going",
    "cost": "RP 7.500.000.000,00",
    "quantity": "3",
    "created_at": "2021-07-15T10:58:03.000Z"
  },
  "request": {
    "type": "POST",
    "url": "/cart"
  }
}  
```

- Response 400: Bad Request
```json
{
  "message": "Validation on request body"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## PUT /cart/:cartID (Admin Only)
Update Cart data by requested param id

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
{
  "car_id": "<selected car's id>", //required
  "quantity": "<quantity requested>", // (Minimum is 1)
  "user_id": "<selected user's id>", // (Only if logged in as an Admin type)
  "status": "<transaction status>" //required
}
```

- Response 200: OK
```json
{
  "message": "Successfully updated cart data!",
  "totalUpdated": 1,
  "request": {
    "type": "PUT",
    "url": "/cart/10"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Validation on request body"
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Cart data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## PATCH /cart/:cartID (Admin Only)

Soft delete Cart data by requesed param id, it will automatically change the transaction status into "canceled"

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully deleted cart data!",
  "totalDeleted": 1,
  "request": {
    "type": "PATCH",
    "url": "/cart/10"
  }
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Cart data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## DELETE /cart/:cartID (Normal User Only)

Permanently delete Cart data by requesed param id. (Admin can't access this endpoint, and Normal User can only delete their own cart data)

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response 200: OK
```json
{
  "message": "Successfully deleted cart data!",
  "totalDeleted": 1,
  "request": {
    "type": "DELETE",
    "url": "/cart/10"
  }
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Cart data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```
</br>

## PATCH /cart/check-out/:cartID (Normal User Only)

Make a payment of a selected cart, it will automatically change the transaction status into "success", and reduced the item/car's stock

- Bearer Token:
```json
{
  "Token": "<your access token>"
}
```

- Request Body:
```json
{
  "payment_amount": "20000000" // required, must be higher than the total cost
}
```

- Response 200: OK
```json
{
  "message": "Payment success!",
  "detailPayment": {
    "price": "Rp 2.500.000.000,00",
    "quantity": "4",
    "totalCost": "Rp 10.000.000.000,00",
    "yourPayment": "Rp 10.000.000.000,00",
    "exchange": "Rp 0,00"
  },
  "request": {
    "type": "PATCH",
    "url": "/cart/check-out/10"
  }
}
```

- Response 400: Bad Request
```json
{
  "message": "Validation on request body!"
}
```

- Response 403: Forbidden
```json
{
  "message": "Forbidden access!"
}
```

- Response 404: Not Found
```json
{
  "message": "Cart data is not found!"
}
```

- Response 500: Internal server error
```json
{
  "message": "Internal Server Error"
}
```