import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { logger } from '../config/logger.js'

export const userAuthentication = (req, res, next) => {
  let token = req.headers.authorization
  // decode token
  if (token) {
    token.startsWith('Bearer ')
    // Remove Bearer from string
    token = token.slice(7, token.length)

    // verifies secret and checks exp
    jwt.verify(token, config.jwt.secret, function (err, decoded) {
      console.info(decoded, 'THE DECODED CODE IS->')

      if (err) {
        next({ status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED })
      } else {
        req.context.userId = decoded._id
        req.context.userType = decoded.userType
        next()
      }
    })
  } else {
    next({ status: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED })
  }
}
