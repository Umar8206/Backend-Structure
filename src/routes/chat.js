import express from 'express'
import { createRoom } from '../controllers/chat.js'
import { userAuthentication } from '../middlewares/authentication.js'

const chat = express.Router()
chat.use(userAuthentication)
chat.post('/createRoom', createRoom)

export default chat
