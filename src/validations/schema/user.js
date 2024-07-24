import Joi from 'joi'
import { regex } from '../../constants/regex.js'

export const forgotPasswordValidation = Joi.object({
  userId: Joi.string().required(),
  password: Joi.string().pattern(new RegExp(regex.password)).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password and confirm password must match',
  }),
  resetPasswordToken: Joi.string().required(),
})
