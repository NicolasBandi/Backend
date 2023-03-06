import Message from '../messageModel.js';
import MessageDto from '../dto/messagesDto.js';
import MessagesDaoFactory from '../dao/messagesDaoFactory.js';

class MessageRepository {
  constructor() {
    this.dao = MessagesDaoFactory.getProductsDao();
  }

  async create(message) {
    const messageDto = await this.dao.create(new MessageDto(message));
    return new Message(messageDto);
  }

  async get() {
    const messagesDto = await this.dao.get();
    return messagesDto.map((messageDto) => new Message(messageDto));
  }

  async getByEmail(email) {
    const messagesDto = await this.dao.getByEmail(email);
    return messagesDto.map((messageDto) => new Message(messageDto));
  }
}

export default MessageRepository;
