import Message from '../messageModel.js'
import MessageDto from '../dto/messagesDto.js';
import MessagesDaoFactory from '../dao/messagesDaoFactory.js'

class MessageRepository {
  constructor() {
    this.dao = MessagesDaoFactory.getMessagesDao();
  }

  async create(message) {
    const messageDto = await this.dao.create(new MessageDto(message));
    return new Message(messageDto);
  }

  async get() {
    const messageDto = await this.dao.get();
    return messageDto.map((messageDto) => new Message(messageDto));
    // return new Message(messageDto)
  }
}

export default MessageRepository;
