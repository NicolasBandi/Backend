import ProductsGraphqlFactory from '../models/dao/productsDaoGraphqlFactory.js'
import Product from '../models/productModelGraphql.js'

const dao = ProductsGraphqlFactory.getProductsDao()

let instance = null

export default class ProductService {
  
  get() {
    return dao.get()
      .map(productDao => new Product(productDao))
  }

  create(productDto) {
    const productDao = dao.create(productDto)
    return new Product(productDao)
  }

  getById(id) {
    return new Product(dao.getById(id))
  }

  updateById(id, productDto) {
    return new Product(dao.updateById(id, productDto))
  }

  deleteById(id) {
    return new Product(dao.deleteById(id))
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductService()
    }
    return instance
  }
}