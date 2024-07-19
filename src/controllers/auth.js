export const signIn = async (req, res, next) => {
  try {
    const payload = {
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
      fcmid: req.body.fcmid,
      deviceType: req.body.deviceType,
      fromPortal: req.body.fromPortal || false,

    }

    res.body.data = await signIn

    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}
