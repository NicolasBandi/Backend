import ProductService from '../services/productsServiceGraphql.js'

export function getProducts() {
  return ProductService
    .getInstance()
    .get()
}

export function getProductById({ id }) {
    return ProductService
      .getInstance()
      .getById(id)
}

export function createProduct({ data }) {
  return ProductService
    .getInstance()
    .create(data)
}

export function updateProduct({ id, data }) {
  return ProductService
    .getInstance()
    .updateById(id, data)
}

export function deleteProduct({ id }) {
  return ProductService
    .getInstance()
    .deleteById(id)
}