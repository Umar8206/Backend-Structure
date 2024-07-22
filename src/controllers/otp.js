import { db } from '../models/index.js'
import { sendOtpService } from '../services/otp.js'

export const sendOtp = async (req, res, next) => {
  try {
    const payload = {
      email: req.body.email,
      phone: req.body.phone,
      type: req.body.type,
      method: req.body.method,
    }
    res.body.data = await sendOtpService(payload)
    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}

export const verifyOtp = async (req, res, next) => {
  try {
    const payload = {
      otp: req.body.otp,
      phone: req.body.phone,
      email: req.body.email,
    }
    res.body.data = await verifyOtpService(payload)
    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}
