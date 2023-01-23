import { Router } from "express";
import compression from "compression";

import logger from '../logger.js'
import info from '../services/servicesInfo.js'

const router = Router();

router.get('/', compression(), (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('info', { layout: 'main' , info: info});
})

export default router;