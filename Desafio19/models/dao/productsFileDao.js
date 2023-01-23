import { v4 as uuid4 } from "uuid";
import fs from "fs";

import config from "../../config/config.js";
import CustomError from "../errors/customError.js";
import ProductsDao from "./productsDao.js";
import ProductDto from "../dto/productsDto.js";

let productsInstance = null; // Singleton

class ProductsFile extends ProductsDao {
  constructor() {
    super();
    this.pathFile = config.dao.file;
    if (!fs.existsSync(this.pathFile)) {
      write(this.pathFile, []);
    }
  }

  async create(productDto) {
    // const { firstname : name, ...rest } = productDto
    // const newPerson = {
    //   name,
    //   ...rest,
    //   id: uuid4(),
    // }
    const newProduct = {
      ...productDto,
      id: uuid4(),
    };
    const productsDao = await read(this.pathFile);
    productsDao.push(newProduct);
    await write(this.pathFile, productsDao);
    return new ProductDto(newProduct);
  }

  async get() {
    const productsDao = await read(this.pathFile);
    return productsDao.map((productDao) => new ProductDto(productDao));
  }

  async getById(id) {
    const productsDao = await read(this.pathFile);
    const productDao = productsDao.find((p) => p.id == id);
    if (!productDao) {
      throw new CustomError(404, `Person with id ${id} not found`);
    }
    return new ProductDto(productDao);
  }

  async updateById(id, personDto) {
    const productsDao = await read(this.pathFile);
    const index = productsDao.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new CustomError(404, `Person with id ${id} not found`);
    }
    if (personDto.nombre) {
      productsDao[index].nombre = personDto.nombre;
    }
    if (personDto.precio) {
      productsDao[index].precio = personDto.precio;
    }
    if (personDto.foto) {
      productsDao[index].foto = personDto.foto;
    }
    await write(this.pathFile, productsDao);
    return new ProductDto(productsDao[index]);
  }

  async deleteById(id) {
    const productsDao = await read(this.pathFile);
    const index = productsDao.findIndex((p) => p.id == id);
    if (index == -1) {
      throw new CustomError(404, `Person with id ${id} not found`);
    }
    const productDeleted = productsDao.splice(index, 1)[0];
    console.log("productDeleted", productDeleted);
    await write(this.pathFile, productsDao);
    return new ProductDto(productDeleted);
  }

  static getInstance() {
    if (!productsInstance) {
      productsInstance = new ProductsFile();
    }
    return productsInstance;
  }
}

function write(pathFile, data) {
  return fs.promises.writeFile(pathFile, JSON.stringify(data, null, 2));
}

async function read(pathFile) {
  const data = await fs.promises.readFile(pathFile, "utf-8");
  return JSON.parse(data);
}

export default ProductsFile;
