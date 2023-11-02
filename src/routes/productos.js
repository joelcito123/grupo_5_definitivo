const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const productosController = require('../controllers/productController');
/*
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/images/products'); 
    }, 
    filename: function (req, file, cb) {
        const newFile = "image-" + Date.now() + path.extname(file.originalname);
        cb(null, newFile);
    }
})*/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + new Date().getTime() + '.' + extension)
    }
});

const upload = multer ({storage})

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