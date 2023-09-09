const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productController');

router.get('/', productosController.index);
router.post('/', productosController.store);
router.get('/detail/:id', productosController.detail);
router.get('/edition/:id', productosController.edit);
router.post('/:id', productosController.update);
router.get('/create', productosController.create);

module.exports = router;