import { v4 as uuid4 } from "uuid";
import fs from "fs";

import config from "../../config/config.js";
import { NotFoundError } from "../errors/customError.js";
import CartsDao from './cartsDao.js';
import CartDto from '../dto/cartsDto.js';
import ProductDto from "../dto/productsDto.js";

let cartsInstance = null; // Singleton

class CartsFile extends CartsDao {
  constructor() {
    super();
    this.pathFile = config.cart.file;
    if (!fs.existsSync(this.pathFile)) {
      write(this.pathFile, []);
    }
  }

  async create(cartDto) {
    const newCart = {
      ...cartDto,
      fyh: Date.now(),
      productos: [],
      id: uuid4(),
    };
    const cartDao = await read(this.pathFile);
    cartDao.push(newCart);
    await write(this.pathFile, cartDao);
    return new CartDto(newCart);
  }

  async getById(id) {
    const cartsDao = await read(this.pathFile);
    const cartDao = cartsDao.find((p) => p.id == id);
    if (!cartDao) {
      throw new NotFoundError(`Person with id ${id} not found`);
    }
    return new CartDto(cartDao);
  }

  async updateById(id, product) {
    const cartsDao = await read(this.pathFile);
    const index = cartsDao.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    }

    const found = cartsDao[index].productos.find((o) => o.nombre == product.nombre);
    const indexProd = cartsDao[index].productos.findIndex((o) => o.nombre == product.nombre);

    if (found) {
      cartsDao[index].productos[indexProd] = { ...product, cantidad: found.cantidad + 1}
      await write(this.pathFile, cartsDao);
      return new CartDto(cartsDao[index]);
    }

    cartsDao[index].productos.push({...product, cantidad: 1});
  
    await write(this.pathFile, cartsDao);
    return new CartDto(cartsDao[index]);
  }

  async deleteById(id) {
    const cartsDao = await read(this.pathFile);
    const index = cartsDao.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    }
    const cartDeleted = cartsDao.splice(index, 1)[0];
    
    await write(this.pathFile, cartsDao);
    return new CartDto(cartDeleted);
  }

  async deleteProductById(id, id_prod) {
    const cartsDao = await read(this.pathFile);
    const index = cartsDao.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    }
    const indexProd = cartsDao[index].productos.findIndex((o) => o.id == id_prod);
    if (indexProd == -1) {
        throw new NotFoundError(`Product with id ${id_prod} in cart not found`);
    }

    const productDeleted = cartsDao[index].productos.splice(indexProd, 1)[0];
    
    await write(this.pathFile, cartsDao);
    return new ProductDto(productDeleted);
  }

  static getInstance() {
    if (!cartsInstance) {
      cartsInstance = new CartsFile();
    }
    return cartsInstance;
  }
}

function write(pathFile, data) {
  return fs.promises.writeFile(pathFile, JSON.stringify(data, null, 2));
}

async function read(pathFile) {
  const data = await fs.promises.readFile(pathFile, "utf-8");
  return JSON.parse(data);
}

export default CartsFile;
