class CartDto {
    constructor(cart) {
      this.id = cart.id || cart._id
      this.email = cart.email
      this.fyh = cart.fyh
      this.productos = cart.productos
      this.direccion = cart.direccion
    }
}

export default CartDto;