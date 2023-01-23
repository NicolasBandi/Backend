import fs from "fs";

import config from "../../config/config.js";
import MessagesDao from './messagesDao.js'
import MessageDto from '../dto/messagesDto.js'

let messagesInstance = null; // Singleton

class MessagesFile extends MessagesDao {
  constructor() {
    super();
    this.pathFile = config.dao.fileForMessages;
    if (!fs.existsSync(this.pathFile)) {
      write(this.pathFile, {
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
    });
    }
  }

  async create(messageDto) {
    const messagesDao = await read(this.pathFile);
    messagesDao.mensajes.push(messageDto);
    await write(this.pathFile, messagesDao);
    return new MessageDto(messageDto);
  }

  async get() {
    const messagesDao = await read(this.pathFile);
    return messagesDao.mensajes.map((messageDao) => new MessageDto(messageDao));
  }

  static getInstance() {
    if (!messagesInstance) {
      messagesInstance = new MessagesFile();
    }
    return messagesInstance;
  }
}

function write(pathFile, data) {
  return fs.promises.writeFile(pathFile, JSON.stringify(data, null, 2));
}

async function read(pathFile) {
  const data = await fs.promises.readFile(pathFile, "utf-8");
  return JSON.parse(data);
}

export default MessagesFile;
