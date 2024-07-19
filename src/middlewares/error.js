import config from "../config/config.js";
import { logger } from "../config/logger.js";
import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

const handleDefaultError = (err) => {
    return {
      status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: err,
      stack: err.stack,
    };
  };
const errorHandler = (err, req, res, next) => {
    let metaData = handleDefaultError(err);
    if (config.env === 'local') {
      logger.error(metaData);
    }
    res.status(metaData.status).send({
      meta: metaData,
    });
  };
  
 export default  errorHandler
  