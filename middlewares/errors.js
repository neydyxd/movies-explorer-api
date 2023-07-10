const ValidationError = require('../utils/errors/ValidationError');
const { COMMON_ERROR_CODE } = require('../utils/errors/errorConstants');
const ConflictError = require('../utils/errors/ConflictError');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(ValidationError.statusCode)
      .send({ message: ValidationError.message });
    return;
  }

  if (err.code === 11000) {
    res.status(ConflictError.statusCode).send({
      message: ConflictError.message,
    });
    return;
  }

  const { statusCode = COMMON_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === COMMON_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
  });

  next();
};
