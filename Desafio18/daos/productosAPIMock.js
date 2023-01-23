import { faker } from '@faker-js/faker/locale/es_MX'

import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";

const { commerce, image } = faker;

function generarProductosFake() {
    return {
        nombre: commerce.product(), 
        precio: parseInt(commerce.price()),
        foto: image.avatar(),
    }
}

class productosAPIMock extends ContenedorMemoria {
    crearObjetos (num) {
        this.elementos = [];
        for (let index = 0; index < num; index++) {
            this.guardar(generarProductosFake());
        }
        return this.elementos;
    }

    actualizar(id, req) {
        let { body : data } = req;
        data = {id: parseInt(id), ...data}
        return super.actualizar(id, data);
    }

}

export default new productosAPIMock