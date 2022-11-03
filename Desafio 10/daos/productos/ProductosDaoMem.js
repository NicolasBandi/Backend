import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

class ProductosDaoMem extends ContenedorMemoria {

    guardar(req) {
        let { body : data } = req;
        data = {timestamp: Date.now(), ...data}
        return super.guardar(data);
    }

    actualizar(id, req) {
        let { body : data } = req;
        data = {id: parseInt(id), timestamp: Date.now(), ...data}
        return super.actualizar(id, data);
    }
}

export default ProductosDaoMem;