const express = require('express');
const mainController = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', mainController.index);
router.get('/productCart', authMiddleware, mainController.carrito);
router.get('/quienesSomos', mainController.quienesSomos);

// eliminar producto del carrito
router.delete('/eliminar/:id', mainController.eliminarDelCarrito);

//cantidad producto
router.post('/cantidad/:productoId', mainController.cantidadProducto);

//ordenar ya
router.get('/ordenar-ya', mainController.ordenarYa)


module.exports = router;