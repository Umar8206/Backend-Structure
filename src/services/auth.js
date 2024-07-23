import { signInValidation, signUpValidation } from '../validations/schema/auth.js'
import { addUser, findUserByEmail, findUserById, updateUserById } from '../repositries/user.js'
import { ReasonPhrases } from 'http-status-codes'
import bcrypt from 'bcryptjs'
import { generateToken } from '../helpers/token.js'
import validate from '../validations/joi.js'
import { hashPassword } from '../helpers/functions.js'
import { otpTypes } from '../constants/otp.js'
import { generateOtp } from '../helpers/otp.js'
import { sendOtpService } from './otp.js'

export const signInService = async (payload) => {
  validate(payload, signInValidation)
  let user
  user = await findUserByEmail(payload?.email)
  if (!user?._id) throw new Error('User Not Found')
  else {
    const isMatch = await bcrypt.compare(payload?.password, user?.password)
    if (!isMatch) throw Error('User Not Found')
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
    createPayload.token = await generateToken({ _id: user?._id, userType: payload?.userType })
    user = await addUser(createPayload)
    return user
  }
}

export const forgotPasswordService = async (payload) => {
  let user
  user = await findUserById(payload?.userId)
  if (user?._id) throw new Error('User Not Found')

  const createPayload = {
    email: user?.email,
    otp: generateOtp(),
    type: otpTypes.forgotPassword,
  }
  const passwordToken = await crypto.randomBytes(32).toString('hex')
  await sendOtpService(createPayload)
  await updateUserById(user?._id, { resetPasswordToken: passwordToken })
  return {
    success: true,
  }
}
