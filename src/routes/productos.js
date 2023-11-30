const express = require('express');
const router = express.Router();
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
<<<<<<< HEAD
const validationsCreateProduct = require("../middlewares/validateCreateProduct");
=======
const { check } = require('express-validator');
>>>>>>> f5ad4d748dd5e2c0d3e498018562e0019365821c

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

const upload = multer({
    storage,
});

// validaciones
const validacionesProductos = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio.').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),

    check('description')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
    check('imagen').custom((value, { req }) => {
        if (!req.file || !['image/jpeg', 'image/png', 'image/gif'].includes(req.file.mimetype)) {
            throw new Error('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF).');
        }
        return true;
    })
];

//Rutas principales de products

<<<<<<< HEAD
router.get('/', productosController.index); //Mostrar Todos los productos

router.get('/detail/:id', productosController.detail); //Mostrar el Detalle de un producto 

//Rutas pertenecientes al CRUD

router.get('/create', productosController.create); //Mostrar Create

router.post('/create', upload.single('image'), validationsCreateProduct ,productosController.store); //Devolver Create 

router.get('/edition/:id', productosController.edit); //Mostrar Update

router.put('/:id', productosController.update); //Devolver Update

router.delete('/:id', productosController.delete); //Devolver Delete
=======
router.get('/', productosController.index);
router.post('/', upload.single('image'), validacionesProductos, productosController.store);
router.get('/detail/:id', productosController.detail);
router.get('/edition/:id', productosController.edit);
router.put('/:id', upload.single('image'), validacionesProductos,productosController.update);
router.get('/create', productosController.create);
router.delete('/:id', productosController.delete);
>>>>>>> f5ad4d748dd5e2c0d3e498018562e0019365821c

module.exports = router;