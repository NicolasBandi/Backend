import ProductsMemDaoGraphql from "./productsMemDaoGraphql.js";

class ProductsFactory {
  static getProductsDao() {
    return ProductsMemDaoGraphql.getInstance();
  }
}

export default ProductsFactory;
