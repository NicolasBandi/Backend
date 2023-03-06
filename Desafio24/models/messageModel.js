class Message {
  #id;
  #email;
  #tipo;
  #fyh;
  #mensaje;

  constructor(messageDto) {
    this.id = messageDto.id;
    this.email = messageDto.email;
    this.tipo = messageDto.tipo;
    this.fyh = messageDto.fyh;
    this.mensaje = messageDto.mensaje
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get tipo() {
    return this.#tipo;
  }

  set tipo(value) {
    this.#tipo = value;
    if (!this.#email) {
        this.#tipo = "Sistema";
    } else {
        this.#tipo = "Usuario";
    }
  }

  get fyh() {
    return this.#fyh;
  }

  set fyh(value) {
    this.#fyh = value;
  }

  get mensaje() {
    return this.#mensaje;
  }

  set mensaje(value) {
    this.#mensaje = value;
  }
}

export default Message;