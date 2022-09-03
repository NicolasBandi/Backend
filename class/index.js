const fs = require('fs');  

class Container {         
  constructor(pelicula) {
    this.pelicula = pelicula;
  }

  async save(objeto) {
    try {
      for (let i = 0; i < objeto.length; i++) {
        objeto[i].id = 1 + i;
      }
      console.log(`Se guardaron ${objeto.length} productos`);
      await fs.promises.writeFile(this.pelicula, JSON.stringify(objeto)); // de objeto a Json

    } catch (error) 
    {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const contenido = await this.getAll();
      let idBusqueda = contenido.find((prod) => prod.id === id);
      console.log(idBusqueda);

    } catch (error) {

      console.log(error)
    }
  }

  async getAll() {
    try {
      let contenido = await fs.promises.readFile(this.pelicula, 'utf-8');
      console.log(contenido);
      return JSON.parse(contenido);
    } catch (error) {

      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await this.getAll();
      const deleted = contenido.filter((producto) => producto.id !== id);
      await fs.promises.writeFile(this.pelicula, JSON.stringify(deleted, null, 4));
      console.log('Eliminado');
    } catch (error) {

      console.log(error)
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.pelicula, []);
      console.log('Todos los productos fueron eliminados');
    } catch (error) {

      console.log(error);
    }
  }
}

module.exports = Container;