import { Router } from "express";

import { listAll, list, create, updateById, deleteById  } from "../services/servicesProductos.js";
import logger from '../logger.js'

const router = Router();

router.get('/', async (req, res) => {
    const productos = await listAll();
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.status(200).json(productos);
})

router.get('/:id', async (req, res) => {
    const producto = await list(req.params.id);
    if (producto) {
        logger.info(`Ruta ${req.originalUrl} metodo GET`);
        res.status(200).json(producto);
    } else {
        res.status(404).json({ error : 'producto no encontrado' })
    }
})

router.post('/', async (req, res) => {
    try {
        const productos = await create();
        logger.info(`Ruta ${req.originalUrl} metodo POST`);
        res.status(201).json(productos);
    } catch (error) {
        logger.error(error.message);
    }
})

router.put('/:id', async (req, res) => {
    const producto = await updateById(req.params.id, req);
    if (producto) { 
        logger.info(`Ruta ${req.originalUrl} metodo PUT`);
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'producto no encontrado' })
    )
})

router.delete('/:id', async (req, res) => {
    const producto = await deleteById(req.params.id);
    if (producto) {
        logger.info(`Ruta ${req.originalUrl} metodo DELETE`);
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'producto no encontrado' })
    )
})

export default router;