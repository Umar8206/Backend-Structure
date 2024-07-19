import winston, { addColors } from 'winston'
import config from './config.js'
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss'
const { combine, timestamp, json, printf, colorize } = winston.format
const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false
})

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false
})
const consoleFormat = combine(
  colorize(),
  timestamp({ format: timestampFormat }),
  printf(({ timestamp, level, message, ...data }) => {
    return `${timestamp} [${level}]: ${message} ${JSON.stringify(data)}`
  })
)
const fileFormat = combine(
  timestamp({ format: timestampFormat }),
  json(),
  printf(({ timestamp, level, message, ...data }) => {
    const response = {
      level,
      timestamp,
      message,
      data,
    }
    return JSON.stringify(response)
  })
)

export const logger = winston.createLogger({
  level: config?.logLevel || 'info',

  format: fileFormat,
  exitOnError: false,
  // store logs in the console
  transports:
    config?.env == 'production'
      ? [
          new winston.transports.Console({
            format: consoleFormat,
          }),
          new winston.transports.File({
            filename: 'combined.log',
            format: fileFormat,
          }),
          new winston.transports.File({
            filename: 'app-error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json()),
          }),
          new winston.transports.File({
            filename: 'app-info.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json()),
          }),
        ]
      : [
          new winston.transports.Console({
            format: consoleFormat,
          }),
        ],
})
