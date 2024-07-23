import express from 'express'
import { forgotPassword } from '../controllers/user.js'
import { userAuthentication } from '../middlewares/authentication.js'

const user = express.Router()
user.use(userAuthentication)

user.post('/forgotPassword', forgotPassword)
export default user
