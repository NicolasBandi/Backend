import config from '../../config/config.js';
import MessagesMemDao from './messagesMemDao.js';
import MessagesFileDao from './messagesFileDao.js';
import MessagesMongoDao from './messagesMongoDao.js'

class MessagesDaoFactory {
  static getMessagesDao() {
    console.log("config.dao.targetForMessages", config.dao.targetForMessages);
    switch (config.dao.targetForMessages) {
      case "file":
        return MessagesFileDao.getInstance();
      case "mongo":
      return MessagesMongoDao.getInstance();
      default:
        return MessagesMemDao.getInstance();
    }
  }
}

export default MessagesDaoFactory;
