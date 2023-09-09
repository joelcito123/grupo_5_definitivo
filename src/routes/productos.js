const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productController');

router.get('/', productosController.index);
router.get('/detail/:id', productosController.detail);
router.get('/:id/edition', productosController.edit);
router.get('/create', productosController.create);

module.exports = router;