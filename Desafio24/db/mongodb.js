import mongoose from 'mongoose'
import logger from '../utils/logger.js';

export const init = async () => {
  try {
    mongoose.set('strictQuery', false); // Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
    const URL = process.env.MONGODB_URI
    mongoose.connect(URL)
    logger.info('Database connected')
  } catch (error) {
    logger.error('Error to connecto to database', error.message)
  }
}