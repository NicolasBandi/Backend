import mongoose, { Schema } from 'mongoose'

const user = new Schema({
  email: { type: String, require: true, unique: true, index: true, validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ },
  password: { type: String, require: true },
  name: { type: String, require: true },
  adress: { type: String, require: true },
  age: { type: Number, require: true },
  tel: { type: String, require: true, unique: true },
  img: { type: String, require: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart', require: true }
}, { timestamps: true })

export default mongoose.model('User', user)