const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
});

module.exports = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};
