import { Server } from 'socket.io'
import { logger } from '../config/logger.js'
import { socketConfig } from '../config/socket.js'
import http from 'http'
import { app } from '../app.mjs'

// Export a function that initializes and configures Socket.IO
const initializeSocket = () => {
  const server = http.createServer(app)
  const io = new Server(server, socketConfig)
  io.on('connection', (socket) => {
    console.info('socket connection ', socket.id)
    socket.on('disconnect', () => {
      logger.info('🔥: A user disconnected')
    })
  })

  return io
}

export default initializeSocket
 