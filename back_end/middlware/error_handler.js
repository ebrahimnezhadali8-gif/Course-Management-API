const AppError = require("../utilities/app_error");
const logger = require("../utilities/winston_loger");

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    logger.warn(`Validation failed: ${error.message}`);
    return res.status(400).send("validation is failed");
  }
  if (error instanceof AppError) {
    logger.error(
      `AppError: ${error.message} | Code: ${error.errorCode} | Path: ${req.originalUrl}`
    );
    return res
      .status(error.statusCode)
      .send({ errorCode: error.errorCode, message: error.message });
  }
  logger.error(
    `Unhandled error: ${error.message} | Stack: ${error.stack} | Path: ${req.originalUrl}`
  );
  res.status(400).send("some thing failed");
};
module.exports = errorHandler;
