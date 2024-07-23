import { forgotPasswordService } from "../services/auth.js"

export const forgotPassword=async(req,res,next)=>{
    try {
      const payload={
        userId:req.user?._id,
    }
    res.body.data=await forgotPasswordService(payload)
    return res.json(res.body)
  
    } catch (error) {
      next(error)
    }
  }