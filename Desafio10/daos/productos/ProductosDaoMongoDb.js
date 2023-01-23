import { Schema } from 'mongoose'
import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('Producto', new Schema({
            timestamp: { type: Date, default: Date.now() },
            nombre: { type: String, require: true },
            descripcion: { type: String, require: true},
            codigo: { type: String, require: true},
            foto: { type: String, require: true},
            precio: { type: Number, require: true },
            stock: { type: String, require: true},
        }))
    }

    async guardar(req) {
        let { body : data } = req;
        return super.guardar(data);
    }

    async actualizar(id, req) {
        let { body : data } = req;
        data = { timestamp: Date.now(), ...data }
        return super.actualizar(id, data);
    }
}

export default ProductosDaoMongoDb