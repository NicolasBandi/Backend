import { v4 as uuid4 } from 'uuid';

import ProductsDao from './productsDao.js';
import ProductDto from '../dto/productsDto.js';
import { NotFoundError } from '../errors/customError.js';

let productsInstance = null; // Singleton

class ProductsMem extends ProductsDao {
  constructor() {
    super();
    this.products = [];
  }

  async create(productDto) {
    const newProduct = {
      ...productDto,
      id: uuid4(),
    };
    this.products.push(newProduct);
    const productDao = await this.getById(newProduct.id);
    return new ProductDto(productDao);
  }

  async get() {
    return this.products.map((productDao) => new ProductDto(productDao));
  }

  async getById(id) {
    const productDao = this.products.find((p) => p.id == id);
    if (!productDao) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return new ProductDto(productDao);
  }

  async updateById(id, productDto) {
    const index = this.products.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    if (productDto.nombre) {
      this.products[index].nombre = productDto.nombre;
    }
    if (productDto.precio) {
      this.products[index].precio = productDto.precio;
    }
    if (productDto.foto) {
      this.products[index].foto = productDto.foto;
    }
    return new ProductDto(this.products[index]);
  }

  async deleteById(id) {
    const index = this.products.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return new ProductDto(this.products.splice(index, 1)[0]);
  }

  static getInstance() {
    if (!productsInstance) {
      productsInstance = new ProductsMem();
    }
    return productsInstance;
  }
}

export default ProductsMem;
