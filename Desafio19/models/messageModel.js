class Message {
    #email;
    #author;
    #text;
    #date;
  
    constructor(messageDto) {
      this.email = messageDto.email;
      this.author = {
        id: messageDto.email,
        nombre: messageDto.author.nombre,
        apellido: messageDto.author.apellido,
        edad: messageDto.author.edad,
        alias: messageDto.author.alias,
        avatar: messageDto.author.avatar,
      };
      this.text = messageDto.text;
      this.date = messageDto.date;
    }
  
    get email() {
      return this.#email;
    }
  
    set email(value) {
      this.#email = value;
    }
  
    get author() {
      return this.#author;
    }
  
    set author(value) {
      this.#author = value;
    }
  
    get text() {
      return this.#text;
    }
  
    set text(value) {
      this.#text = value;
    }
  
    get date() {
      return this.#date;
    }
  
    set date(value) {
      this.#date = value;
    }
  }
  
  export default Message;