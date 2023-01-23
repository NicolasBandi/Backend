import mongoose from 'mongoose'

import config from '../../config/config.js'
import MessagesDao from './messagesDao.js'
import MessageDto from '../dto/messagesDto.js';

let messagesInstance = null

class MessagesMongo extends MessagesDao {
  constructor() {
    super()
    mongoose
      .connect(config.dao.mongo)
      .then(() => {
        console.log('Database connected.')
      })
      .catch(error => {
        console.error('Error to connect to database', error.message)
      })
    this.model = mongoose.model('Message', {
        // id: 'mensajes',
        mensajes: [{
            email: String,
            author: {
                id: String,
                nombre: String,
                apellido: String,
                edad: Number,
                alias: String,
                avatar: String,
            },
            text: String,
            date: String,
        }],
      })
  }

  async create(messageDto) {
    const { id : _id } = await this.model.findOne({})
    await this.model.findOneAndUpdate({ _id: _id },{ $push: { mensajes: messageDto }})
    
    const lastMessageInArray = await this.model.findOne({},{mensajes: {$slice: -1}})

    return new MessageDto(lastMessageInArray.mensajes[0])
  }

  async get() {
    let messagesDao = await this.model.find({})
    
    if (messagesDao.length === 0) {
        await this.model.create({ 
            mensajes: [{
                email: "coder@house.com",
                author: {
                    id: "coder@house.com",
                    nombre: 'Coder', 
                    apellido: 'House', 
                    edad: '0', 
                    alias: 'CoderHouse',
                    avatar: 'https://i.pinimg.com/280x280_RS/9b/20/ea/9b20ea6de7ec343daac5714717dc8cd2.jpg',
                },
                text: "Bienvenidos",
                date: "01/01/2022 00:00:00",
            }]
        })
    }
    messagesDao = await this.model.findOne({})
    return messagesDao.mensajes.map(messageDao => new MessageDto(messageDao))
  }

  static getInstance() {
    if (!messagesInstance) {
      messagesInstance = new MessagesMongo()
    }
    return messagesInstance
  }
}

export default MessagesMongo