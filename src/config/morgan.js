import morgan from 'morgan'
import { logger } from './logger.js';

morgan.token('param', function (req, res, param) {
    return req.params[param]
})


export default morgan(':method :host :status :param[id] :res[content-length] - :response-time ms',{
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => logger.http(message.trim()),
    },
  });;
 