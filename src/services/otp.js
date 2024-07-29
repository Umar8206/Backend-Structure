import { otpMethods, otpTypes } from '../constants/otp.js'
import { generateOtp } from '../helpers/otp.js'
import { createOtp, deleteOtp, findOtp } from '../repositries/otp.js'
import { findUserByEmail, findUserByEmailOrPhone, updateUserByEmail, updateUserById } from '../repositries/user.js'
import sendMail from '../utils/mailer.js'
import validate from '../validations/joi.js'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
const readFile = promisify(fs.readFile)
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { otpValidation, otpVerification } from '../validations/schema/otp.js'
import { hashPassword } from '../helpers/functions.js'
import { Messages } from '../constants/messages.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

export const sendOtpService = async (payload) => {
  validate(payload, otpValidation)
  let user
  user = await findUserByEmailOrPhone(payload)
  if (!user?._id) throw new Error(Messages.userNotFound)
  const otp = await generateOtp()
  const createPayload = {
    email: payload?.email,
    otp: otp,
    type: payload?.type,
    phone: payload?.phone,
  }
  await deleteOtp(payload?.email, payload?.type)
  await createOtp(createPayload)
  if (payload?.email && payload.method == otpMethods.email) {
    const filePath = path.join(
      __dirname,
      '../templates/',
      createPayload?.type == otpTypes.registration ? `otp.html` : `forgotPassword.html`
    )
    const htmlContent = await readFile(filePath, 'utf-8')
    const emailContent = htmlContent.replace('{{OTP}}', otp)
    await sendMail(payload?.email, otpTypes[createPayload?.type].toUpperCase(), emailContent)
  }

  return {
    success: true,
  }
}

export const verifyOtpService = async (payload) => {
  validate(payload, otpVerification)
  const otp = await findOtp(payload?.email, payload?.otp)
  let user
  if (!otp?._id) throw new Error('Invalid OTP')
  if (otp?.type == otpTypes.registration) {
    await updateUserByEmail(payload?.email, { isVerified: true })
  } else if (otp?.type == otpTypes.forgotPassword) {
    const passwordToken = await hashPassword(`${otp?.email}:${otp?.otp}`)
    user = await updateUserByEmail(payload?.email, { resetPasswordToken: passwordToken })
  }
  return {
    success: true,
    token: user?.resetPasswordToken,
  }
}
