import Product from '../productModel.js';
import ProductDto from '../dto/productsDto.js';
import ProductsDaoFactory from '../dao/productsDaoFactory.js';

class ProductRepository {
  constructor() {
    this.dao = ProductsDaoFactory.getProductsDao();
  }

  async create(product) {
    const productDto = await this.dao.create(new ProductDto(product));
    return new Product(productDto);
  }

  async get() {
    const productDto = await this.dao.get();
    return productDto.map((productDto) => new Product(productDto));
  }

  async getById(id) {
    const productDto = await this.dao.getById(id);
    return new Product(productDto);
  }

  async updateById(id, person) {
    const productDto = await this.dao.updateById(id, new ProductDto(person));
    return new Product(productDto);
  }

  async deleteById(id) {
    const productDto = await this.dao.deleteById(id);
    return new Product(productDto);
  }
}

export default ProductRepository;
