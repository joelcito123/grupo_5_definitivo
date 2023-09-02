const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productController');

router.get('/productDetail', productosController.detalle)
router.get('/edicion', productosController.edicion)
router.get('/creacion', productosController.creacion)

module.exports = router;