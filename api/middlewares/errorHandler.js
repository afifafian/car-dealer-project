const errorHandler = (err, req, res, next) => {
  console.log(err)
  switch (err.name) {
    case "SequelizeValidationError":
      const errValidationMessages = [];
      err.errors.forEach(error => {
        errValidationMessages.push(error.message);
      });
      return res.status(400).json({
        message: "Validation Error", errors: errValidationMessages
      });

    case "SequelizeUniqueConstraintError":
      const errUniqueMessages = [];
      err.errors.forEach(error => {
        errUniqueMessages.push(error.message);
      });
      return res.status(400).json({
        message: "Validation Error", 
        errors: errUniqueMessages
      });

    case "Custom_Error":
      return res.status(err.status).json({
        message: err.message
      });

    case "JsonWebTokenError":
      return res.status(403).json({
        message: "Invalid access token!"
      });

    case "TokenExpiredError":
      return res.status(401).json({
        message: "Token Expired, please re-login!"
      });

    default:
    return res.status(500).json({
      message: `Internal Server Error: ${err}`
    });
  }
}

module.exports = errorHandler;
