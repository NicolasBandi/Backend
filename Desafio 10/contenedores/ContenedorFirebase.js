import FirebaseAdmin from 'firebase-admin'
import { readFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import config from '../config.js'

const serviceAccount = JSON.parse(
    await readFile(
        new URL(config.firebase.serviceAccount, import.meta.url)
    )
)

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount)
});

class ContenedorFirebase {
    constructor(collectionName) {
        const db = FirebaseAdmin.firestore();
        this.query = db.collection(collectionName);
    }
  
    async listar(id) {
        const doc = this.query.doc(id);
        const item = await doc.get();
        const response = item.data();
        return response;
    }
  
    async listarAll() {
        const querySnapshot = await this.query.get();
        let docs = querySnapshot.docs;
        const response = docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            }
        })
        return response;
    }
  
    async guardar(obj) {
        let id = uuidv4();
        let doc = this.query.doc(id);
        await doc.create(obj);
        return { id: id, ...obj };
    }

    async agregarProducto(obj, id) {
        let response = await this.listar(id);
        if (response) {
            const doc = this.query.doc(id);
            response.productos = [...response.productos, obj];
            await doc.update(response);
            return obj;
        } else {
            return undefined;
        }
    }
  
    async actualizar(id, obj) {
        const doc = this.query.doc(id);
        const item = await this.listar(id);
        if (item) {
            await doc.update(obj);
            return obj;
        } else {
            return undefined;
        }
    }
  
    async borrar(id) {
        const doc = this.query.doc(id);
        const item = await this.listar(id);
        if (item) {
            await doc.delete();
            return item;
        } else {
            return undefined;
        }
    }

    async borrarProducto(id, id_prod) {
        let response = await this.listar(id);
        if (response) {
            const doc = this.query.doc(id);
            const indexProd = response.productos.findIndex(o => o.id == id_prod);
            if (indexProd == -1) {
                return 0;
            }
            response.productos.splice(indexProd, 1);
            await doc.update(response);
            return response;
        } else {
            return 0;
        }
    }
  
    async borrarAll() {
        throw new Error('Not implemented');
    }
}
  
export default ContenedorFirebase