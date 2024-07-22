import { otpMethods, otpTypes } from '../constants/otp.js'
import { generateOtp } from '../helpers/otp.js'
import { db } from '../models/index.js'
import { createOtp, findOtp } from '../repositries/otp.js'
import { findUserByEmailOrPhone } from '../repositries/user.js'
import sendMail from '../utils/mailer.js'
import validate from '../validations/joi.js'
import otpValidation from '../validations/schema/otp.js'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
const readFile = promisify(fs.readFile)
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))

export const sendOtpService = async (payload) => {
  validate(payload, otpValidation)
  let user
  user = await findUserByEmailOrPhone(payload)
  if (!user?._id) throw new Error('User Not Found')
  let otp = await generateOtp()
  const createPayload = {
    email: payload?.email,
    otp: otp,
    type: payload?.type,
    phone: payload?.phone,
  }

  await createOtp(createPayload)
  if (payload?.email && payload.method == otpMethods.email) {
    const filePath = path.join(__dirname, '../templates/', `otp.html`)
    const htmlContent = await readFile(filePath, 'utf-8')
    const emailContent = htmlContent.replace('{{OTP}}', otp)
    await sendMail(payload?.email, otpTypes.registration.toUpperCase(), emailContent)
  }
  return {
    success: true,
  }
}

export const verifyOtpService = async (payload) => {
  validate(payload, otpValidation)
  const otp = await findOtp(payload?.email, payload?.otp)
  if (!otp?._id) throw new Error('Invalid OTP')
  if (otp?.type == otpTypes.registration) {
    await updateUserByEmail(payload?.email, { isVerified: true })
  }
  return {
    success: true,
  }
}
