import config from '../../config/config.js';
import MessagesMemDao from './messagesMemDao.js';
import MessagesFileDao from './messagesFileDao.js';
import MessagesMongoDao from './messagesMongoDao.js';

class ProductsDaoFactory {
  static getProductsDao() {
    switch (config.dao.target) {
      case "file":
        return MessagesFileDao.getInstance();
      case "mongo":
      return MessagesMongoDao.getInstance();
      default:
        return MessagesMemDao.getInstance();
    }
  }
}

export default ProductsDaoFactory;