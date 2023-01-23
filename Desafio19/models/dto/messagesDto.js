class MessageDto {
    constructor(message) {
      this.email = message.email,
      this.author = {
        id: message.email,
        nombre: message.author.nombre,
        apellido: message.author.apellido,
        edad: message.author.edad,
        alias: message.author.alias,
        avatar: message.author.avatar
      }
      this.text = message.text
      this.date = message.date

    }
}

export default MessageDto;