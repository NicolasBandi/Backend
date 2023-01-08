import { Router } from 'express'

import { carritosDao as carritosApi } from '../daos/index.js'
import UserModel from '../models/user.js'
import logger from '../utils/logger.js';
import sendMail from '../utils/nodemailer.js';
import sendWhatsapp from '../utils/twilio.js';

const router = Router();

export async function createCart(req) {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const carritoId = await carritosApi.guardar(req);
    return carritoId._id;
}

router.post('/', async (req, res) => {
    // crea un carrito y devuelve su id
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const carritoId = await carritosApi.guardar(req);
    res.status(201).json({ ID : carritoId.id});
})

router.delete('/:id', async (req, res) => {
    // vacia un carrito y lo elimina
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const carrito = await carritosApi.borrar(req.params.id);
    if (carrito) {
        res.status(204).end();
    } else (
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id} metodo DELETE no implementada` // 404 NOT FOUND
         })
    )
})

router.get('/:id/productos', async (req, res) => {
    // lista todos los productos guardados en el carrito
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const carrito = await carritosApi.listar(req.params.id);

    const { user } = req;
    const userPopulated = await UserModel.findOne({ _id: user._id }).populate('cart');

    if (carrito) {
        sendMail('Vista carrito', 'Iniciaste el pedido a la vista del carrito');
        sendWhatsapp('Vista carrito', userPopulated.tel);
        // res.status(200).json(carrito);
        res.render('cart', { layout: 'main', cart: carrito});
    } else {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos metodo GET no implementada` // 404 NOT FOUND
         })
    }
})


router.post('/:id/productos', async (req, res) => {
    // incopora productos al carrito por el id del producto
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const producto = await carritosApi.agregarProducto(req, req.params.id);
    if (producto) { 
        res.status(201).json(producto);
    } else (
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos metodo POST no implementada` // 404 NOT FOUND
         })
    )
})


router.delete('/:id/productos/:id_prod', async (req, res) => {
    // elimina un producto del carrito por su id de carrito y de producto
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const carrito = await carritosApi.borrarProducto(req.params.id, req.params.id_prod);
    
    if (carrito == 0) {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos/${req.params.id_prod} metodo DELETE no implementada` // 404 NOT FOUND
         })
    } else {
        res.status(204).end();
    } 
})

export default router