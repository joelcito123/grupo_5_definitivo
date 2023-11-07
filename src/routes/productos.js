const express = require('express'); //Requerir Express
const router = express.Router(); //Requerir Router
const multer = require('multer'); //Requerir Multer
const path = require("path"); //Requerir Path
const guestMiddleware = require('../middlewares/guestMiddleware'); //Requerir Middleware Guest
const authMiddleware = require('../middlewares/authMiddleware'); //Requerir Middleware Auth

const productosController = require('../controllers/productController'); //Requerir Controlador

//Constante storage (para las imágenes)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + new Date().getTime() + '.' + extension)
    }
});

const upload = multer ({storage}) //Upload para las imágenes

//Rutas principales de products

router.get('/', productosController.index); //Mostrar Todos los productos

router.get('/detail/:id', productosController.detail); //Mostrar el Detalle de un producto 

//Rutas pertenecientes al CRUD

router.get('/create', productosController.create); //Mostrar Create

router.post('/', upload.single('image'), productosController.store); //Devolver Create 

router.get('/edition/:id', productosController.edit); //Mostrar Update

router.put('/:id', productosController.update); //Devolver Update

router.delete('/:id', productosController.delete); //Devolver Delete

module.exports = router;