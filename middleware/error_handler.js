const { CustomError } = require('../errors/custom_error');

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  return res.status(500).json({ error: error });
};

module.exports = errorHandler;