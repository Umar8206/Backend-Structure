import { db } from '../models/index.js'

export const createOtp = async (payload) => {
  return await db.otp.create(payload)
}
export const findOtp = async (email, otp) => {
  return await db.otp.findOne({ otp: otp, email: email })
}
export const deleteOtp = async (email, type) => {
  return await db.otp.deleteMany({ type:type, email: email })
}
