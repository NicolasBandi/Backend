import MessageDao from './messagesDao.js';
import MessageDto from '../dto/messagesDto.js';

let messagesInstance = null; // Singleton

class MessagesMem extends MessageDao {
  constructor() {
    super();
    this.messages = {
        id: 'mensajes',
        mensajes: [{
            email: "coder@house.com",
            author: {
                id: "coder@house.com",
                nombre: 'Coder', 
                apellido: 'House', 
                edad: '0', 
                alias: 'CoderHouse',
                avatar: 'https://i.pinimg.com/280x280_RS/9b/20/ea/9b20ea6de7ec343daac5714717dc8cd2.jpg',
            },
            text: "Bienvenidos",
            date: "01/01/2022 00:00:00",
        }]
    };
  }

  async create(messageDto) {
    this.messages.mensajes.push(messageDto);
    // const productDao = await this.getById(newProduct.id);
    return new MessageDto(messageDto);
  }

  async get() {
    // console.log('DaoMem', this.messages.mensajes.map((messageDao) => new MessageDto(messageDao)));
    // console.log(new MessageDto(this.messages.mensajes));
    return this.messages.mensajes.map((messageDao) => new MessageDto(messageDao));
    // return new MessageDto(this.messages)
  }

  static getInstance() {
    if (!messagesInstance) {
      messagesInstance = new MessagesMem();
    }
    return messagesInstance;
  }
}

export default MessagesMem;
