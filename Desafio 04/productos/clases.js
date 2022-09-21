const fs = require('fs');  

module.exports = class Contenedor {         
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
  

  async escribirArchivo(archivo, contenido) {
    try {
      await fs.writeFileSync(
         archivo,
         JSON.stringify(contenido, null, 2),
         "utf-8"
        );
    } catch (error) {
        console.log(error.message);
    }
  }

  async leerArchivo(archivo) {
        try {
              const data = await fs.readFileSync(archivo, "utf-8");
              return JSON.parse(data);
        } catch (error) {
              console.log(error.message);
        }
  }
  
  saberSiExiste(archivo) {
        try {
              if (!fs.existsSync(archivo)) {
                    throw new Error("El archivo no se encontro!!");
              } else {
                    return true;
              }
        } catch (error) {
              console.log(error.message);
        }
  }

 async modificar(id, contenido) {
  try {
      
    if (this.saberSiExiste(this.archivo)) {
      let data = await this.leerArchivo(this.archivo);

         
      let dataId = data.filter((item) => item.id === id);
        if (dataId.length === 0) {
           
             throw new Error("No se encontro el ID");
        } else {
                  
          data = data.filter((item) => item.id !== id);
          dataId = { id: id, ...contenido };
          data.push(dataId);
          this.escribirArchivo(this.archivo, data);
          console.log(`se modifico la Id:${id}`);
              }
        }
  } catch (error) {
        console.log(error.message);
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

