import { hashPassword } from '../helpers/functions.js'
import { findUser, findUserById, updateUserById } from '../repositries/user.js'
import validate from '../validations/joi.js'
import { forgotPasswordValidation } from '../validations/schema/user.js'

export const forgotPasswordService = async (payload) => {
    validate(payload,forgotPasswordValidation)
  let user
  user = await findUserById(payload?.userId)
  if (!user?._id) throw new Error('User Not Found')
  const updatePayload = {
    resetPasswordToken: null,
    password: await hashPassword(payload?.password),
  }
  user = await findUser({ _id: user?._id, resetPasswordToken: payload?.resetPasswordToken }, updatePayload)
  if(!user?._id) throw new Error("Reset Password Token Failed")
  return user
}
