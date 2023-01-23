import mensajesApiArchivo from '../daos/mensajesAPIArchivo.js'

async function listAll() {
    const mensajes = await mensajesApiArchivo.listarAll();
    return mensajes;
}

async function save(data) {
    const mensaje = await mensajesApiArchivo.guardar(data);
    return mensaje;
}

export {
    listAll,
    save,
}