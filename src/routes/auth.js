import express from 'express'
import { signIn, signUp } from '../controllers/auth.js'

const auth = express.Router()

auth.post('/signIn', signIn)
auth.post('/signUp',signUp)
export default auth
