const { createLogger, format, transports } = require("winston");
const path = require("path");

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: "info",
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
  ],
});
module.exports = logger;
