import mongoose from 'mongoose'

import { NotFoundError } from '../errors/customError.js'
import CartsDao from './cartsDao.js';
import CartDto from '../dto/cartsDto.js';
import ProductDto from "../dto/productsDto.js";

let cartsInstance = null

class CartsMongo extends CartsDao {
  constructor() {
    super()
    this.model = mongoose.model('Carrito', {
      email: String,
      fyh: { type: Date, default: Date.now(), require: true },
      productos: { type: [], require: true },
      direccion: String,
    })
  }

  async create(cartDto) {
    const { id : _id, ...rest } = cartDto
    const cartDao = await this.model.create({ _id, ...rest })
    return new CartDto(cartDao)
  }

  async getById(id) {
    const cartDao = await this.model.findOne({ _id: id })
    if (!cartDao) {
      throw new NotFoundError(`Cart with id ${id} not found`, { id })
    }
    return new CartDto(cartDao)
  }

  async updateById(id, product) {
    const cartDao = await this.model.findOne({ _id: id })
    if (!cartDao) {
        throw new NotFoundError(`Cart with id ${id} not found`, { id })
    } 

    const found = cartDao.productos.find((o) => o.nombre == product.nombre);
    const indexProd = cartDao.productos.findIndex((o) => o.nombre == product.nombre);

    if (found) {
      cartDao.productos[indexProd] = { ...product, cantidad: found.cantidad + 1}
      return new CartDto(await cartDao.save());
    }

    cartDao.productos.push({...product, cantidad: 1});
    return new CartDto(await cartDao.save())
  }

  async deleteById(id) {
    const cartDao = await this.model.findOne({ _id: id })
    if (!cartDao) {
        throw new NotFoundError(`Cart with id ${id} not found`, { id })
    }
    await this.model.deleteOne({ _id: id })
    return new CartDto(cartDao)
  }

  async deleteProductById(id, id_prod) {
    const cartDao = await this.model.findOne({ _id: id })
    if (!cartDao) {
        throw new NotFoundError(`Cart with id ${id} not found`, { id })
    }
    const indexProd = cartDao.productos.findIndex((o) => o.id == id_prod);
    if (indexProd == -1) {
        throw new NotFoundError(`Product with id ${id_prod} in cart not found`, { id });
    }
    const productDeleted = cartDao.productos.splice(indexProd, 1)[0];
    await cartDao.save();
    return new ProductDto(productDeleted)
  }

  static getInstance() {
    if (!cartsInstance) {
      cartsInstance = new CartsMongo()
    }
    return cartsInstance
  }
}

export default CartsMongo