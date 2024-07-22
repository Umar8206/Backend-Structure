import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import config from "../config/config";
import { logger } from "../config/logger";



export default  (req, res, next) => {
  let token = req.headers.authorization;
  // decode token
  if (token) {
    token.startsWith('Bearer ');
    // Remove Bearer from string
    token = token.slice(7, token.length);

    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
      if (err) {
        next(StatusCodes.UNAUTHORIZED(ReasonPhrases.UNAUTHORIZED));
      } else {
        logger.info(decoded, 'THE DECODED CODE IS->');
        req.context.userId = decoded.id;
        req.context.userType = decoded.userType;
        next();
      }
    });
  } else {
    next(StatusCodes.UNAUTHORIZED(ReasonPhrases.UNAUTHORIZED));
  }
};