import OrderModel from "../orderModel.js";
import OrderDto from "../dto/ordersDto.js"

export async function create(cart) {
    const orderNumber = await OrderModel.countDocuments({})

    const order = await OrderModel.create({ ordenNumero: orderNumber + 1, items: cart.productos, email: cart.email })

    return new OrderDto(order)
  }
  
  export default {
    create,
  };