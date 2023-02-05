import ProductRepository from '../models/repositories/productsRepository.js';
import Product from '../models/productModel.js';
import ProductDto from '../models/dto/productsDto.js';

const repository = new ProductRepository();

export async function create(data) {
  const product = await repository.create(new Product(data));
  return new ProductDto(product);
}

export async function get() {
  const product = await repository.get();
  return product.map((product) => new ProductDto(product));
}

export async function getById(id) {
  const product = await repository.getById(id);
  return new ProductDto(product);
}

export async function updateById(id, data) {
  const product = await repository.updateById(id, new Product(data));
  return new ProductDto(product);
}

export async function deleteById(id) {
  const product = await repository.deleteById(id);
  return new ProductDto(product);
}

export default {
  create,
  get,
  getById,
  updateById,
  deleteById,
};
