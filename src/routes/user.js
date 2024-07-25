import express from 'express'
import { forgotPassword, uploadProfile } from '../controllers/user.js'
import { userAuthentication } from '../middlewares/authentication.js'
import { upload } from '../config/multer.js'

const user = express.Router()
// user.use(userAuthentication)

user.post('/forgotPassword', forgotPassword)
user.post('/uploadProfile', upload.single('profile'),uploadProfile)
export default user
