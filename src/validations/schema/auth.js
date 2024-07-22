import Joi from "joi";
import { deviceTypes, userTypes } from "../../constants/user.js"

export const signInValidation = Joi.object({
  phone: Joi.string()
    .max(11)
    .optional(),
  password: Joi.string().required(),
  fcmid: Joi.string().optional(),
  deviceType: Joi.string().valid(deviceTypes.android, deviceTypes.ios).optional(),
  fromPortal: Joi.boolean().optional(),
  email: Joi.string().email().required(),
});

export const signUpValidation = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .max(11)
    .required(),
  gender: Joi.string().optional(),
  userType: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),

  fcmid: Joi.string().optional(),
  deviceType: Joi.string().valid(deviceTypes.android, deviceTypes.ios).optional(),
  fromPortal: Joi.boolean().optional(),
});