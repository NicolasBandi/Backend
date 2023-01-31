import mongoose from 'mongoose'

export const init = async () => {
  try {
    mongoose.set('strictQuery', false); // Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
    const URL = process.env.MONGODB_URI
    mongoose.connect(URL)
    console.log('Database connected')
  } catch (error) {
    console.error('Error to connecto to database', error.message)
  }
}