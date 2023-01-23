import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('productos.json')
    }

    async guardar(req) {
        let { body : data } = req;
        data = {timestamp: Date.now(), ...data}
        return super.guardar(data);
    }

    async actualizar(id, req) {
        let { body : data } = req;
        data = {id: parseInt(id), timestamp: Date.now(), ...data}
        return super.actualizar(id, data);
    }
}

export default ProductosDaoArchivo