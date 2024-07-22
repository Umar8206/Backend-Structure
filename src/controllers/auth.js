import { userTypes } from "../constants/user.js"
import { signInService, signUpService } from "../services/auth.js"

export const signIn = async (req, res, next) => {
  try {
    const payload = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      fcmid: req.body.fcmid,
      deviceType: req.body.deviceType,
      fromPortal: req.body.fromPortal || false,

    }

    res.body.data = await signInService(payload)

    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}


export const signUp = async (req, res, next) => {
  try {
    const payload = {
      userName: req.body.userName,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      phone: req.body.phone,
      email: req.body.email,
      fcmid: req.body.fcmid,
      deviceType: req.body.deviceType,
      fromPortal: req.body.fromPortal || false,
userType:req.body.userType,

    }

    res.body.data = await signUpService(payload)

    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}