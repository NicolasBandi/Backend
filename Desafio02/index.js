const Container = require('./class');
const express = require ("express")

const products = new Container('./database.txt');

const getProducts = products.getAll();

const app = express();

products.getAll();

/*mensaje de pagina principal*/
app.get("/", (req, res) => {
    res.send(
          '<h1 style="color: blue">Bienvenidos al servidor express</h1>'
    );
});

app.get("/productos", async (req, res) => {
    const resultado = await getProducts;
    res.send(resultado);
  });

  app.get("/productoRamdom", async (req, res) => {
    const resultado = await getProducts;
    const random = resultado[Math.ceil(Math.random() * resultado.length)];
    res.send(random);
  });

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Estamos en el servidor ${server.address().port}`);
})
server.on('error', (err)=> console.log(err));
