import { Router } from 'express'
import { carritosDao as carritosApi } from '../daos/index.js'

const router = Router();

router.post('/', async (req, res) => {
    
    const carritoId = await carritosApi.guardar(req);
    res.status(201).json({ ID : carritoId.id});
})

router.delete('/:id', async (req, res) => {
    
    const carrito = await carritosApi.borrar(req.params.id);
    if (carrito) {
        res.status(204).end();
    } else (
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id} DELETE method not implemented` 
         })
    )
})

router.get('/:id/productos', async (req, res) => {
    
    const carrito = await carritosApi.listar(req.params.id);
    if (carrito) {
        res.status(200).json(carrito);
    } else {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos GET method not implemented` // 404 NOT FOUND
         })
    }
})


router.post('/:id/productos', async (req, res) => {
    
    const producto = await carritosApi.agregarProducto(req, req.params.id);
    if (producto) { 
        res.status(201).json(producto);
    } else (
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos POST method not implemented` // 404 NOT FOUND
         })
    )
})


router.delete('/:id/productos/:id_prod', async (req, res) => {
    
    const carrito = await carritosApi.borrarProducto(req.params.id, parseInt(req.params.id_prod));
    
    if (carrito == 0) {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos/${req.params.id_prod}  DELETE method not implemented` // 404 NOT FOUND
         })
    } else {
        res.status(204).end();
    } 
})

export default router