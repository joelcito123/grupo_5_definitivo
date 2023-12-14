const express = require('express');
const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index);
router.get('/productCart', mainController.carrito);
router.get('/quienesSomos', mainController.quienesSomos);

// eliminar producto del carrito
router.delete('/eliminar/:id', mainController.eliminarDelCarrito)


module.exports = router;