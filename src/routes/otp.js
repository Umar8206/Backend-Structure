import express from 'express'
import { sendOtp, verifyOtp } from '../controllers/otp.js'

const otp = express.Router()

otp.post('/generate', sendOtp)
otp.post('/verify',verifyOtp)
export default otp
