class Product {
  #id;
  #nombre;
  #precio;
  #foto;

  constructor(productDto) {
    this.id = productDto.id;
    this.nombre = productDto.nombre;
    this.precio = productDto.precio;
    this.foto = productDto.foto;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    // if (!id) throw new Error('"id" es un campo requerido');
    this.#id = value;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(value) {
    // if (!nombre) throw new Error('"nombre" es un campo requerido');
    this.#nombre = value;
  }

  get precio() {
    return this.#precio;
  }

  set precio(value) {
    // if (!value) throw new Error('"precio" es un campo requerido');
    if (isNaN(value)) throw new Error('"precio" debe ser numérico');
    if (value < 0) throw new Error('"precio" debe ser positivo');
    this.#precio = value;
  }

  get foto() {
    return this.#foto;
  }

  set foto(value) {
    // if (!value) throw new Error('"foto" es un campo requerido');
    this.#foto = value;
  }
}

export default Product;
