const fs = require('fs');  

module.exports = class Container {    
       
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(objeto) {
    try {
      for (let i = 0; i < objeto.length; i++) {
        objeto[i].id = 1 + i;
      }
      console.log(`Se guardaron ${objeto.length} productos`);
      await fs.promises.writeFile(this.archivo, JSON.stringify(objeto,null,'\t')); // de objeto a Json

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
      let contenido = await fs.promises.readFile(this.archivo, 'utf-8');
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
      await fs.promises.writeFile(this.archivo, JSON.stringify(deleted, null, 4));
      console.log('Eliminado');
    } catch (error) {

      console.log(error)
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.archivo, []);
      console.log('Todos los productos fueron eliminados');
    } catch (error) {

      console.log(error);
    }
  }
}

