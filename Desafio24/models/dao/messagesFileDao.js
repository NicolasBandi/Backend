import { v4 as uuid4 } from "uuid";
import fs from "fs";

import config from "../../config/config.js";
import { NotFoundError } from "../errors/customError.js";
import MessagesDao from './messagesDao.js';
import MessageDto from '../dto/messagesDto.js';

let messagesInstance = null; // Singleton

class MessagesFile extends MessagesDao {
  constructor() {
    super();
    this.pathFile = config.message.file;
    if (!fs.existsSync(this.pathFile)) {
      write(this.pathFile, []);
    }
  }

  async create(messageDto) {
    const newMessage = {
      ...messageDto,
      fyh: Date.now(),
      id: uuid4(),
    };
    const messagesDao = await read(this.pathFile);
    messagesDao.push(newMessage);
    await write(this.pathFile, messagesDao);
    return new MessageDto(newMessage);
  }

  async get() {
    const messagesDao = await read(this.pathFile);
    return messagesDao.map((messageDao) => new MessageDto(messageDao));
  }

  async getByEmail(email) {
    const messagesDao = await read(this.pathFile);
    const filteredMessagesDao = messagesDao.filter((p) => p.email == email);
    if (filteredMessagesDao.length === 0) {
      throw new NotFoundError(`Messages with email ${email} not found`);
    }
    return filteredMessagesDao.map((messageDao) => new MessageDto(messageDao));
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
