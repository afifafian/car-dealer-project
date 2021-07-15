const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_KEY 
? process.env.JWT_KEY : "secretKey";

const jwtSign = (payLoad) => {
  return jwt.sign(payLoad, secretKey, {
    expiresIn: "1h"
  });
}
const jwtVerify = (token) => {
  console.log("kesini")
  return jwt.verify(token, secretKey);
}

module.exports = {
  jwtSign,
  jwtVerify
};
