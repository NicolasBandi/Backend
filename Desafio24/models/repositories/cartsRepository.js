import Cart from '../cartModel.js';
import CartDto from '../dto/cartsDto.js';
import Product from '../productModel.js';
import ProductDto from '../dto/productsDto.js';
import CartsDaoFactory from '../dao/cartsDaoFactory.js';

class CartRepository {
  constructor() {
    this.dao = CartsDaoFactory.getProductsDao();
  }

  async create(product) {
    const cartDto = await this.dao.create(new CartDto(product));
    return new Cart(cartDto);
  }

  async getById(id) {
    const cartDto = await this.dao.getById(id);
    return new Cart(cartDto);
  }

  async updateById(id, product) {
    const cartDto = await this.dao.updateById(id, new ProductDto(product));
    return new Cart(cartDto);
  }

  async deleteById(id) {
    const cartDto = await this.dao.deleteById(id);
    return new Cart(cartDto);
  }

  async deleteProductById(id, id_prod) {
    const productDto = await this.dao.deleteProductById(id, id_prod);
    return new Product(productDto);
  }
}

export default CartRepository;