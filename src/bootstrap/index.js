import util from 'util';
import mongoose from 'mongoose';
import config from '../config/config.js';
import { logger } from '../config/logger.js';
export const bootstrap = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    logger.info(`Mongodb connected host: ${config.mongoose.url}`);
  } catch (err) {
    logger.error('Error while connecting database or redis', err);
    throw err;
  }
  return Promise.resolve(true);
};