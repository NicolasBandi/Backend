import { Router } from 'express'
import { productosDao as productosApi } from '../daos/index.js'

const router = Router();

const administrador = true;

router.get('/', async (req, res) => {
    
    const productos = await productosApi.listarAll();
    res.status(200).json(productos);
})

router.get('/:id', async (req, res) => {
    
    const producto = await productosApi.listar(req.params.id);
    if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/productos/${req.params.id} GET method not implemented` // 404 NOT FOUND
         })
    }
})

router.post('/', async (req, res) => {
   
    const productos = await productosApi.guardar(req);
    if (administrador) {
        // res.status(201).json(productos);
        res.redirect('/');
    } else {
        res.status(403).json({
            error: -1,
            descripcion: 'ruta http://localhost:8080/api/productos/ POST method not implemented ' // 403 FORBIDDEN
        })
    }
})

router.put('/:id', async (req, res) => {
    
    const producto = await productosApi.actualizar(req.params.id, req);
    if (administrador) {
        if (producto) { 
            res.status(204).end();
        } else (
            res.status(404).json({
                error: -2,
                descripcion: `ruta http://localhost:8080/api/productos/${req.params.id} PUT method not implemented` // 404 NOT FOUND
             })
        )
    } else {
        res.status(403).json({
            error: -1,
            descripcion: 'ruta http://localhost:8080/api/productos/ PUT method not implemented '
        })
    }
})

router.delete('/:id', async (req, res) => {
    
    const producto = await productosApi.borrar(req.params.id);
    if (administrador) {
        if (producto) {
            res.status(204).end();
        } else (
            res.status(404).json({
                error: -2,
                descripcion: `ruta http://localhost:8080/api/productos/${req.params.id} DELETE method not implemented` // 404 NOT FOUND
             })
        )
    } else {
        res.status(403).json({
            error: -1,
            descripcion: 'ruta http://localhost:8080/api/productos/ DELETE method not implemented ' // 403 FORBIDDEN
        })
    }
})

export default router