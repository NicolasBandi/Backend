import { v4 as uuid4 } from 'uuid';

import CartsDao from './cartsDao.js';
import CartDto from '../dto/cartsDto.js';
import ProductDto from '../dto/productsDto.js';
import { NotFoundError } from '../errors/customError.js';

let cartsInstance = null; // Singleton

class CartsMem extends CartsDao {
  constructor() {
    super();
    this.carts = [];
  }

  async create(cartDto) {
    const newCart = {
      ...cartDto,
      fyh: Date.now(),
      productos: [],
      id: uuid4(),
    };
    this.carts.push(newCart);
    const cartDao = await this.getById(newCart.id);
    return new CartDto(cartDao);
  }

  async getById(id) {
    const cartDao = this.carts.find((p) => p.id == id);
    if (!cartDao) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    }
    return new CartDto(cartDao);
  }

  async updateById(id, product) {
    const index = this.carts.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    } 

    const found = this.carts[index].productos.find((o) => o.nombre == product.nombre);
    const indexProd = this.carts[index].productos.findIndex((o) => o.nombre == product.nombre);

    if (found) {
      this.carts[index].productos[indexProd] = { ...product, cantidad: found.cantidad + 1}
      return new CartDto(this.carts[index]);
    }

    this.carts[index].productos.push({...product, cantidad: 1});
    return new CartDto(this.carts[index]);
  }

  async deleteById(id) {
    const index = this.carts.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    }
    return new CartDto(this.carts.splice(index, 1)[0]);
  }

  async deleteProductById(id, id_prod) {
    const index = this.carts.findIndex((p) => p.id == id);
    if (index == -1) {
        throw new NotFoundError(`Cart with id ${id} not found`);
    }
    const indexProd = this.carts[index].productos.findIndex((o) => o.id == id_prod);
    if (indexProd == -1) {
        throw new NotFoundError(`Product with id ${id_prod} in cart not found`);
    }

    return new ProductDto(this.carts[index].productos.splice(indexProd, 1)[0]);
  }

  static getInstance() {
    if (!cartsInstance) {
      cartsInstance = new CartsMem();
    }
    return cartsInstance;
  }
}

export default CartsMem;
