class ProductDto {
    constructor(product) {
      this.id = product.id || product._id
      this.nombre = product.nombre
      this.foto = product.foto
      this.precio = product.precio
      this.descripcion = product.descripcion
      this.categoria = product.categoria
    }
}

export default ProductDto;