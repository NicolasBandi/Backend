class Cart {
  #id;
  #email;
  #fyh;
  #productos;
  #direccion;

  constructor(cartDto) {
    this.id = cartDto.id;
    this.email = cartDto.email;
    this.fyh = cartDto.fyh;
    this.productos = cartDto.productos;
    this.direccion = cartDto.direccion
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get fyh() {
    return this.#fyh;
  }

  set fyh(value) {
    this.#fyh = value;
  }

  get productos() {
    return this.#productos;
  }

  set productos(value) {
    this.#productos = value;
  }

  get direccion() {
    return this.#direccion;
  }

  set direccion(value) {
    this.#direccion = value;
  }
}

export default Cart;
