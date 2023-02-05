import { v4 as uuid4 } from "uuid";

import { NotFoundError } from "../errors/customError.js";
import ProductsDao from './productsDao.js';
import Product from "../productModelGraphql.js";

let productsInstance = null; // Singleton

class ProductsMem extends ProductsDao {
  constructor() {
    super();
    this.productsMap = {};
  }

  get() {
    return Object.values(this.productsMap);
  }

  getById(id) {
    if (!this.productsMap[id]) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return this.productsMap[id];
  }

  create(productDto) {
    const id = uuid4();
    const newProduct = new Product({
      ...productDto,
      id,
    });
    this.productsMap[id] = newProduct;
    return newProduct;
  }

  updateById(id, productDto) {
    const productDao = this.getById(id);
    const updatedProduct = new Product({
      ...productDao,
      ...productDto,
      id,
    });
    this.productsMap[id] = updatedProduct;
    return updatedProduct;
  }

  deleteById(id) {
    const productDao = this.getById(id);
    delete this.productsMap[id];
    return productDao;
  }

  // deleteMany({ key, value }) {
  //   const remindersDao = Object.values(this.productsMap);
  //   const remindersDeleted = [];
  //   remindersDao.forEach((reminderDao) => {
  //     if (reminderDao[key] === value) {
  //       remindersDeleted.push({ ...reminderDao });
  //       delete this.productsMap[reminderDao.id];
  //     }
  //   });
  //   return remindersDeleted;
  // }

  static getInstance() {
    if (!productsInstance) {
      productsInstance = new ProductsMem();
    }
    return productsInstance;
  }
}

export default ProductsMem;
