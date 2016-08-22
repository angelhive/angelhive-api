import winston from 'winston';

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
  ],
});

logger.stream = {
  write: (message, encoding) => { // eslint-disable-line no-unused-vars
    logger.info(message);
  },
};

export default logger;
