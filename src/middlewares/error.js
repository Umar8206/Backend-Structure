import config from '../config/config.js';
import { logger } from '../config/logger.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { environments } from '../constants/app.js';

const handleJoiError = (err) => {
  return {
    message: err.details[0].message,
    status: StatusCodes.BAD_REQUEST,
  };
};

const handleNotFoundError = (err) => {
  return {
    message: ReasonPhrases.NOT_FOUND,
    status: StatusCodes.NOT_FOUND,
  };
};

const handleDefaultError = (err) => {
  return {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    error: err,
    stack: config.env === environments.local ? err.stack : undefined,
  };
};

const errorHandler = (err, req, res, next) => {
  let metaData;

  if (err.isJoi) {
    metaData = handleJoiError(err);
  } else if (err.status === StatusCodes.NOT_FOUND) {
    metaData = handleNotFoundError(err);
  } else {
    metaData = handleDefaultError(err);
  }

  if (config.env === environments.local) {
    logger.error(metaData);
  }

  res.status(metaData.status).send({
    meta: metaData,
  });
};

export default errorHandler;
