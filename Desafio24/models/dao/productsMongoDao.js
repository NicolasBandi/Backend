import mongoose from 'mongoose'

import { NotFoundError } from '../errors/customError.js'
import ProductsDao from "./productsDao.js";
import ProductDto from "../dto/productsDto.js";

let productsInstance = null

class ProductsMongo extends ProductsDao {
  constructor() {
    super()
    this.model = mongoose.model('Producto', {
      nombre: String,
      foto: String,
      precio: Number,
      descripcion: String,
      categoria: String,
    })
  }

  async create(productDto) {
    const { id : _id, ...rest } = productDto
    const productDao = await this.model.create({ _id, ...rest })
    return new ProductDto(productDao)
  }

  async get() {
    const productsDao = await this.model.find({})
    return productsDao.map(productDao => new ProductDto(productDao))
  }

  async getById(id) {
    const productDao = await this.model.findOne({ _id: id })
    if (!productDao) {
      throw new NotFoundError(`Product with id ${id} not found`, { id })
    }
    return new ProductDto(productDao)
  }

  async getByCategory(category) {
    const productsDao = await this.model.find({ categoria: category })
    if (productsDao.length === 0) {
      throw new NotFoundError(`Product with category ${category} not found`);
    }
    return productsDao.map((productDao) => new ProductDto(productDao));
  }

  async updateById(id, productDto) {
    const productDao = await this.model.findOne({ _id: id })
    if (!productDao) {
        throw new NotFoundError(`Product with id ${id} not found`, { id })
    }
    if (productDto.nombre) {
      productDao.nombre = productDto.nombre
    }
    if (productDto.precio) {
      productDao.precio = productDto.precio
    }
    if (productDto.foto) {
      productDao.foto = productDto.foto
    }
    return new ProductDto(await productDao.save())
  }

  async deleteById(id) {
    const productDao = await this.model.findOne({ _id: id })
    if (!productDao) {
        throw new NotFoundError(`Product with id ${id} not found`, { id })
    }
    await this.model.deleteOne({ _id: id })
    return new ProductDto(productDao)
  }

  static getInstance() {
    if (!productsInstance) {
      productsInstance = new ProductsMongo()
    }
    return productsInstance
  }
}

export default ProductsMongo