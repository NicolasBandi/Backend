import mongoose from 'mongoose'

import { NotFoundError } from '../errors/customError.js'
import MessagesDao from './messagesDao.js';
import MessageDto from '../dto/messagesDto.js';

let messagesInstance = null

class MessagesMongo extends MessagesDao {
  constructor() {
    super()
    this.model = mongoose.model('Mensaje', {
      email: String,
      tipo: String,
      fyh: { type: Date, default: Date.now(), require: true },
      mensaje: String,
    })
  }

  async create(messageDto) {
    const { id : _id, ...rest } = messageDto
    const messageDao = await this.model.create({ _id, ...rest })
    return new MessageDto(messageDao)
  }

  async get() {
    const messagesDao = await this.model.find({})
    return messagesDao.map(messageDao => new MessageDto(messageDao))
  }

  async getByEmail(email) {
    const productsDao = await this.model.find({ email: email })
    if (productsDao.length === 0) {
      throw new NotFoundError(`Messages with category ${email} not found`);
    }
    return productsDao.map((productDao) => new MessageDto(productDao));
  }

  static getInstance() {
    if (!messagesInstance) {
      messagesInstance = new MessagesMongo()
    }
    return messagesInstance
  }
}

export default MessagesMongo