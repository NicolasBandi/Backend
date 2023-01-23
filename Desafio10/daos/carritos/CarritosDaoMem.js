import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class CarritosDaoMem extends ContenedorMemoria {

    guardar(req) {
        let { body : data } = req;
        data = { timestamp: Date.now(), ...data, productos: [] }
        return super.guardar(data);
    }

    agregarProducto(req, id) {
        let { body : data } = req;
        return super.agregarProducto(data, id);
    }
}

export default CarritosDaoMem;