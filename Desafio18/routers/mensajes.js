import { Router } from "express";

import { listAll, save } from "../services/servicesMensajes.js";
import logger from '../logger.js'

const router = Router();

router.get('/', async (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    const mensajes = await listAll();
    res.status(200).json(mensajes);
})

router.post('/', async (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo POST`);
    console.log(req.body);
    const mensaje = await save(req.body);
    res.status(200).json(mensaje);
})

export default router;