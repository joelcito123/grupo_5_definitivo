const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productController');

router.get('/productDetail', productosController.detalle)

module.exports = router;