import Redis from 'ioredis'
import config from '../config/config.js'

let redis

export const createRedisConnection = async () => {
  try {
    redis = new Redis(
      {
        port: config.redis.port,
        host: config.redis.host,
        username: config.redis.username,
        password: config.redis.password,
        db: config.redis.db,
      },
      { lazyConnect: true, }
    )
    await redis.connect()
  } catch (e) {
    throw Error("error connecting redis ->",e)
  }
}

export const getFromCache = async (key) => {
  return redis.get(key)
}

export const deleteFromCache = async (key) => {
  return redis.del(key)
}

export const setInCache = async (key, value, expiryTime) => {
  if (expiryTime) {
    // EX stands for seconds
    // PX stands for milliseconds
    return redis.set(key, value, 'EX', expiryTime)
  }
  return redis.set(key, value)
}

export const pushToList = async (key, values) => {
  return redis.rpush(key, values)
}

export const getList = async (key) => {
  return redis.lrange(key, 0, -1)
}
