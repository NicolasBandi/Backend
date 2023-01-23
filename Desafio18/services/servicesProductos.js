import productosAPIMock from "../daos/productosAPIMock.js";

async function listAll() {
    const productos = productosAPIMock.listarAll();
    return productos;
}

async function list(id) {
    const producto = productosAPIMock.listar(id);
    return producto;
}

async function create() {
    const productos = productosAPIMock.crearObjetos(5); // create 5 random items
    return productos;
}

async function updateById(id, req) {
    const producto = productosAPIMock.actualizar(id, req);
    return producto;
}

async function deleteById(id) {
    const producto = productosAPIMock.borrar(id);
    return producto;
}

export {listAll, list, create, updateById, deleteById}