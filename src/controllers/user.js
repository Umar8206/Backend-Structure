import { forgotPasswordService } from '../services/user.js'

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
