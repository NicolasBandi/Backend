const { Router } = require('express');
const productos = require('./productos');

const router = Router();

router.use('/productos', productos);

module.exports = router;