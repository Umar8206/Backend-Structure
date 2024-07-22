
// Constants

const { StatusCodes, ReasonPhrases } = require("http-status-codes");

export default (userType) => {
  return (req, res, next) => {
    if (userType !== req.context.userType) {
      next(StatusCodes.UNAUTHORIZED(ReasonPhrases.UNAUTHORIZED));
    }
    next();
  };
};