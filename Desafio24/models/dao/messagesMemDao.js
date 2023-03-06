import { v4 as uuid4 } from 'uuid';

import MessagesDao from './messagesDao.js';
import MessageDto from '../dto/messagesDto.js';
import { NotFoundError } from '../errors/customError.js';

let messagesInstance = null; // Singleton

class MessagesMem extends MessagesDao {
  constructor() {
    super();
    this.messages = [];
  }

  async create(messageDto) {
    const newMessage = {
      ...messageDto,
      fyh: Date.now(),
      id: uuid4(),
    };
    this.messages.push(newMessage);
    return new MessageDto(newMessage);
  }

  async get() {
    return this.messages.map((messageDto) => new MessageDto(messageDto));
  }

  async getByEmail(email) {
    const messagesDao = this.messages.filter((p) => p.email == email);
    if (messagesDao.length == 0) {
      throw new NotFoundError(`Messages with email ${email} not found`);
    }
    return messagesDao.map((messageDao) => new MessageDto(messageDao));
  }

  static getInstance() {
    if (!messagesInstance) {
      messagesInstance = new MessagesMem();
    }
    return messagesInstance;
  }
}

export default MessagesMem;
