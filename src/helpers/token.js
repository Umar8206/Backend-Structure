import config from '../config/config.js'
import jwt from "jsonwebtoken"
export const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwt.secret,
      { expiresIn:config.jwt.expiresIn },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
