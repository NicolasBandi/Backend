import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongoDB.URI);

class ContenedorMongoDb {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema);
    }
  
    async listar(id) {
        let valido = mongoose.isValidObjectId(id) // valida el id

        if (valido) {
            const result = await this.collection.findById(id).lean();
            if (result) {
                return result;
            } else {
                return undefined;
            }
        }
    }
  
    async listarAll() {
        return this.collection.find({}).lean();
    }
  
    async guardar(obj) {
        const result = await this.collection.create(obj);
        return result;
    }

    async agregarProducto(obj, id) {
        let valido = mongoose.isValidObjectId(id) // valida el id

        if (valido) {
            await this.collection.updateOne({ _id: id }, { $push: { productos: obj } });
            return this.listar(id);
        }
    }
  
    async actualizar(id, obj) {
        let valido = mongoose.isValidObjectId(id) // valida el id

        if (valido) {
            const result = await this.collection.updateOne({ _id: id }, { $set: obj });
            return result.modifiedCount;
        }
    }
  
    async borrar(id) {
        let valido = mongoose.isValidObjectId(id) // valida el id

        if (valido) {
            const result = await this.collection.deleteOne({ _id: id });
            return result.deletedCount;
        }
    }

    async borrarProducto(id, id_prod) {
        let valido = mongoose.isValidObjectId(id) // valida el id

        if (valido) {
            const result = await this.collection.updateOne({ _id: id }, { $pull: { productos: { id: id_prod } } });
            return result.modifiedCount;
        }
    }
  
    async borrarAll() {
        throw new Error('No implementado');
    }
}
  
export default ContenedorMongoDb