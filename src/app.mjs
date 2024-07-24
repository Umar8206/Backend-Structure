import express from 'express'
import config from './config/config.js'
import morgan from './config/morgan.js'
import helmet from 'helmet'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import errorHandler from './middlewares/error.js'
import router from './routes/index.js'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { requestMiddleWare } from './middlewares/request.js'
const app = express()
import expressStatusMonitor from 'express-status-monitor'

// set security HTTP headers
app.use(helmet())

//status monitoring
app.use(expressStatusMonitor());

// parse json request body
app.use(express.json())

// enable CORS
app.use(cors())
app.options('*', cors())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// api logging
app.use(morgan)

// sanitize request data
app.use(mongoSanitize())

// Request Middleware
app.use(requestMiddleWare)

// define routes
app.use('/api/', router)

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

// app.get('/status', expressStatusMonitor)

// 404 error handler
app.use((req, res, next) => {
  const err = new Error(ReasonPhrases.NOT_FOUND)
  err.status = StatusCodes.NOT_FOUND
  next(err)
})

// error handling middleware
app.use(errorHandler)

export default app
