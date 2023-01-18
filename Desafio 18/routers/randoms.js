import { Router } from "express";
import { fork } from 'child_process'

import logger from '../logger.js'

const router = Router();

router.get('/', (req, res) => {
    let { query: { cant } } = req;
    
    if (!cant) {
        cant = 100000000;
    }

    const child = fork('randomGenerator.js')

    child.on('message', (msg) => {
        if (msg === 'ready') {
            return child.send(cant);
        }
        logger.info(`Ruta ${req.originalUrl} metodo GET`);
        res.json(msg);
    })
})

export default router;