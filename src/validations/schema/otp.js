import Joi from 'joi';
import { otpMethods, otpTypes } from '../../constants/otp.js';

const otpValidation = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().max(11),
  type: Joi.string().valid(otpTypes.forgotPassword,otpTypes.registration).required(),
  method: Joi.string().valid(otpMethods.email,otpMethods.sms,otpMethods.whatsapp).required(),
}).xor('email', 'phone');

export default otpValidation;