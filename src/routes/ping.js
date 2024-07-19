import express from 'express'
import { pingPong } from '../controllers/ping.js'

const ping = express.Router()

ping.get('/', pingPong)

export default ping
