const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.render('pages/list',{productos})
})

app.get('/', (req,res) => {
    res.render('pages/form', {})
})

app.post('/productos', async(req,res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
})

const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(`Escuchando al servidor http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));