import mongoose from 'mongoose'
import { deviceTypes, userTypes } from '../constants/user.js'

const userModel = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    fromPortal: {
      type: Boolean,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
      enum: Object.values(deviceTypes),
    },
    fcmid: {
      type: String,
    },
    gender: {
      type: String,
      // required: true,
    },
    userType: {
      type: String,
      default: userTypes.appUser,
      enum: Object.values(userTypes),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      expires: Date.now() + 3600000,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('User', userModel)
