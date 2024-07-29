import Joi from 'joi'

export const chatRoomValidation = Joi.object({
    userId: Joi.string().required(),
    users: Joi.array().required(),
  name: Joi.string().optional(),
})

