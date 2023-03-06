import ordersMongoDao from '../models/dao/ordersMongoDao.js';
import sendMail from '../utils/nodemailer.js';

export async function create(cart) {
  const order = await ordersMongoDao.create(cart);
  await sendMail(order.email, `Nuevo pedido de ${order.email}`, order.items)
  return order;
}

export default {
  create,
};