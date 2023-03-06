import mongoose, { Schema } from 'mongoose'

const order = new Schema({
    items: { type: [], require: true },
    ordenNumero: { type: Number, require: true },
    fyh: { type: Date, default: Date.now(), require: true },
    estado: { type: String, default: "Generada", require: true },
    email: { type: String, require: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
})

export default mongoose.model('Ordenes', order)