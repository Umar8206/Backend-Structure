import express from 'express'
import { signIn } from '../controllers/auth.js'

const auth = express.Router()

auth.post('/signIn', signIn)

export default auth
