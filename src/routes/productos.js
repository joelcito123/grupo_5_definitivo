const express = require('express');
const router = express.Router();
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const productosController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + new Date().getTime() + '.' + extension)
    }
});

const upload = multer ({
    storage,
})

router.get('/', productosController.index);
router.post('/', upload.single('image'), productosController.store);
router.get('/detail/:id', productosController.detail);
router.get('/edition/:id', productosController.edit);
router.put('/:id', productosController.update);
router.get('/create', productosController.create);
router.delete('/:id', productosController.delete);

module.exports = router;