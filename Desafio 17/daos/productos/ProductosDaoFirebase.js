import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos')
    }

    async guardar(req) {
        let { body : data } = req;
        data = { timestamp: Date.now(), ...data }
        return super.guardar(data);
    }

    async actualizar(id, req) {
        let { body : data } = req;
        data = { timestamp: Date.now(), ...data}
        return super.actualizar(id, data);
    }
}

export default ProductosDaoFirebase