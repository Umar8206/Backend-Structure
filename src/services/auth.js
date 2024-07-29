import { signInValidation, signUpValidation } from '../validations/schema/auth.js'
import { addUser, findUserByEmail, updateUserById } from '../repositries/user.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../helpers/token.js'
import validate from '../validations/joi.js'
import { hashPassword } from '../helpers/functions.js'
import { Messages } from '../constants/messages.js'

export const signInService = async (payload) => {
  validate(payload, signInValidation)
  let user
  user = await findUserByEmail(payload?.email)
  if (!user?._id) throw new Error(Messages.userNotFound)
  else {
    const isMatch = await bcrypt.compare(payload?.password, user?.password)
    if (!isMatch) throw Error(Messages.userNotFound)
    if (!user.isVerified) {
      user.token = await generateToken({ _id: user?._id, userType: user?.userType })
    }

    const updatedUser = await updateUserById(user?._id, { ...user, ...payload })
    return updatedUser
  }
}

export const signUpService = async (payload) => {
  validate(payload, signUpValidation)
  let user
  let createPayload = { ...payload }
  user = await findUserByEmail(payload?.email)
  if (user?._id) throw new Error('User Already Exist')
  if (payload?.password !== payload?.confirmPassword) throw Error('Password Not Matched')
  else {
    createPayload.password = await hashPassword(payload?.password)
    user = await addUser(createPayload)
    createPayload.token = await generateToken({ _id: user?._id, userType: payload?.userType })
    user = await updateUserById(user?._id, createPayload)
    return user
  }
}
