class OrdersDto {
    constructor(order) {
      this.id = order.id || order._id
      this.items = order.items
      this.ordenNumero = order.ordenNumero
      this.fyh = order.fyh
      this.estado = order.estado
      this.email = order.email
    }
}

export default OrdersDto;