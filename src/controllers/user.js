import { forgotPasswordService, saveUserProfile } from '../services/user.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'

export const forgotPassword = async (req, res, next) => {
  try {
    const payload = {
      userId: req.context.userId,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      resetPasswordToken: req.body.resetPasswordToken,
    }
    res.body.data = await forgotPasswordService(payload)
    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}

export const uploadProfile = async (req, res, next) => {
  try {
    const payload = {
      profile: req.file?.path,
      userId: req.context.userId,
    }
    console.log("uploadProfile", payload?.profile);
    res.body.data=await saveUserProfile(payload)
    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}
