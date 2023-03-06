import CartRepository from '../models/repositories/cartsRepository.js';
import Carrito from '../models/cartModel.js';
import CarritoDto from '../models/dto/cartsDto.js';
import Product from '../models/productModel.js';
import ProductDto from '../models/dto/productsDto.js';

const repository = new CartRepository();

export async function create(data) {
  const cart = await repository.create(new Carrito(data));
  return new CarritoDto(cart);
}

export async function getById(id) {
  const cart = await repository.getById(id);
  return new CarritoDto(cart);
}

export async function updateById(id, data) {
  const cart = await repository.updateById(id, new Product(data));
  return new CarritoDto(cart);
}

export async function deleteById(id) {
  const cart = await repository.deleteById(id);
  return new CarritoDto(cart);
}

export async function deleteProductById(id, id_prod) {
    const product = await repository.deleteProductById(id, id_prod);
    return new ProductDto(product);
  }

export default {
  create,
  getById,
  updateById,
  deleteById,
  deleteProductById,
};