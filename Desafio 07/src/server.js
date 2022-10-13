const express = require('express');
const app = express();
const Contenedor = require('./contenedor')
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])


app.use(express.json());
app.use(express.urlencoded({extended:true}));


const routerProducts = express.Router();
const routerCart = express.Router();

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);


// GET api/productos
routerProducts.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products);
})

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(id);
    
    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "product not found"})
})

// POST api/productos
routerProducts.post('/', async (req,res, next) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    
    const newProductId = await contenedor.save(body);
    
    newProductId
        ? res.status(200).json({"success" : "product added with ID: "+newProductId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
})

// PUT api/productos/:id
routerProducts.put('/:id' ,async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    
    wasUpdated
        ? res.status(200).json({"success" : "product updated"})
        : res.status(404).json({"error": "product not found"})
})


// DELETE /api/productos/:id
routerProducts.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "product successfully removed"})
        : res.status(404).json({"error": "product not found"})
})


// POST /api/carrito

routerCart.post('/', async(req, res) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    body.products = [];
    const newCartId = await carrito.save(body);
    
    newCartId
        ? res.status(200).json({"success" : "cart added with ID: "+newCartId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
    
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);
    
    if (product) {
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist
            ? res.status(200).json({"success" : "product added"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found, verify the ID  is correct."})
    }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "cart not found"})
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod);
    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        cartExists
            ? res.status(200).json({"success" : "product removed"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found"})
    }
})

const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(`El Servidor Esta Escuchando El Puerto ${PORT} !!`)
})

server.on('error', (err) => console.log(err));