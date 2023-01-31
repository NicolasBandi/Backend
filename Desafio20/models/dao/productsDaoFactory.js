import config from '../../config/config.js';
import ProductsMemDao from './productsMemDao.js';
import ProductsFileDao from './productsFileDao.js';
import ProductsMongoDao from './productsMongoDao.js';

class ProductsDaoFactory {
  static getProductsDao() {
    console.log("DAO_Target:", config.dao.target);
    switch (config.dao.target) {
      case "file":
        return ProductsFileDao.getInstance();
      case "mongo":
      return ProductsMongoDao.getInstance();
      default:
        return ProductsMemDao.getInstance();
    }
  }
}

export default ProductsDaoFactory;
