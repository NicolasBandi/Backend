import cartsService from '../services/cartsService.js';
import ordersService from '../services/ordersService.js'

export async function createById(req, res, next) {
    try {
      const cart = await cartsService.getById(req.params.id);
      const order = await ordersService.create(cart);
      return res.status(201).json(order)
    } catch (error) {
      next(error)
    }
  }
  
  export default {
    createById,
  }