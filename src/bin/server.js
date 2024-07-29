import { Server } from 'socket.io'
import { app } from '../app.mjs'
import { bootstrap } from '../bootstrap/index.js'
import config from '../config/config.js'
import { socketConfig } from '../config/socket.js'
import initializeSocket from '../utils/socket.js'
import http from 'http'
import { logger } from '../config/logger.js'
let server
const server1 = http.createServer(app)

const io = new Server(server1, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: false,
      transports: ['websocket', 'polling'],
      allowEIO3: true,
    },
  })

io.on('connection', (socket) => {
  logger.info('New client connected:', socket.id)
  socket.on("get_messages", async (object) => {
    console.log("getting message", object)
    socket.emit('response',{success:true})
  }),
  socket.on('disconnect', () => {
    logger.info('Client disconnected:', socket.id)
  }),

  socket.on('error', (error) => {
    logger.error('Socket error:', error)
  })
})

io.on('connect_error', (error) => {
  logger.error('Connection error:', error)
})

io.on('error', (error) => {
  console.error('Socket.IO server error:', error)
})
bootstrap().then(() => {
  //   initializeSocket()
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`)
  })
})
