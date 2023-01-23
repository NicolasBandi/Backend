import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }

    async guardar(req) {
        let { body : data } = req;
        data = { timestamp: Date.now(), ...data, productos: [] };
        return super.guardar(data);
    }

    async agregarProducto(req, id) {
        let { body : data } = req;
        return super.agregarProducto(data, id);
    }
}

export default CarritosDaoFirebase