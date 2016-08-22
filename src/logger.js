/**
 * Copyright (C) 2016, AngelHive Co.,Ltd. All Rights Reserved.
 *
 * Unauthorized copying of this source code, via any medium is strictly prohibited.
 *
 * THIS SOFTWARE IS PROPRIETARY AND CONFIDENTIAL.
 */

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
