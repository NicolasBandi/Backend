import { BadRequestError } from "./errors/customError.js";

class Product {
  #id;
  #nombre;
  #precio;
  #foto;
  #descripcion;
  #categoria;

  constructor(productDto) {
    this.id = productDto.id;
    this.nombre = productDto.nombre;
    this.foto = productDto.foto;
    this.precio = productDto.precio;
    this.descripcion = productDto.descripcion
    this.categoria = productDto.categoria
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(value) {
    if (!value) throw new BadRequestError(`Nombre es un campo requerido`);
    this.#nombre = value;
  }

  get precio() {
    return this.#precio;
  }

  set precio(value) {
    if (value == 0) throw new BadRequestError('Precio debe ser mayor a 0');
    if (!value) throw new BadRequestError('Precio es un campo requerido');
    if (isNaN(value)) throw new BadRequestError('Precio debe ser numérico');
    if (value < 0) throw new BadRequestError('Precio debe ser positivo');
    this.#precio = value;
  }

  get foto() {
    return this.#foto;
  }

  set foto(value) {
    if (!value) throw new BadRequestError('Foto es un campo requerido');
    this.#foto = value;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(value) {
    if (!value) throw new BadRequestError('Descripcion es un campo requerido');
    this.#descripcion = value;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(value) {
    if (!value) throw new BadRequestError('"Categoria" es un campo requerido');
    this.#categoria = value;
  }
}

export default Product;
