import { Schema } from 'mongoose'
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

  constructor() {
    super('Cart', new Schema({
        timestamp: { type: Date, default: Date.now(), require: true },
        productos: { type: [], require: true },
    }))
  }

  async guardar(req) {
    let { body : data } = req;
    data = { timestamp: Date.now(), ...data };
    return super.guardar(data);
  }

  async agregarProducto(req, id) {
    let { body : data } = req;
    return super.agregarProducto(data, id);
  }
}

export default CarritosDaoMongoDb