class Usuario{

    constructor(nombre, apellido,libros=[]){

        this.nombre = nombre;
        this.apellido= apellido;
        this.libros = libros;
        this.mascotas=[];

    }

    getFullName() {
      console.log (`El nombre del usuario es ${this.nombre} ${this.apellido}`); 
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
        
    }

    countMascota(){
        console.log (this.mascotas.length)
    }

    addBook(nombre, autor){
        let nuevoLibro = {nombre, autor};
        this.libros.push(nuevoLibro);
    }

    getBookNames(){

        let nombresLibro = this.libros.map((libros) => {
            return libros.nombre
        })
        console.log(nombresLibro)
    }



}

const usuario = new Usuario ('Nicolas', 'Pedicino')

usuario.getFullName()

usuario.addMascota('Canario')
usuario.addMascota('Perro')

usuario.addBook('Harry Potter', 'J.K.R')
usuario.addBook('Señor de los Anillos', 'Tolkien')

console.log(usuario)

usuario.countMascota()
usuario.getBookNames()







