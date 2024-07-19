import { HttpStatusCode } from 'axios'
import { logger } from '../config/logger.js'

export const pingPong = async (req, res, next) => {
  try {
    logger.info('Pong!')
    res.body.meta.totalCount = 10
    res.body.data = { message: 'Pong' }
    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}
