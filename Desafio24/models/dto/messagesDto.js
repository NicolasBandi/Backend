class MessageDto {
    constructor(message) {
      this.id = message.id || message._id
      this.email = message.email
      this.tipo = message.tipo
      this.fyh = message.fyh
      this.mensaje = message.mensaje
    }
}

export default MessageDto;