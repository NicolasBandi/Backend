import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('carritos.json')
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

export default CarritosDaoArchivo