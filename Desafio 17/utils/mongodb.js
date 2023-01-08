import mongoose from 'mongoose'

import config from '../config.js'
import logger from './logger.js'

export const init = async () => {
  try {
    const URL = config.mongoDB.URI;
    mongoose.connect(URL);
    logger.info('Database connected.')
  } catch (error) {
    logger.error('Error to connect to database', error.message);
  }
}