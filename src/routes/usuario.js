const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//Requiero el controlador
const userController = require('../controllers/userController');

// Requiero los Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const validacionesLoginUsuario = [
    check('email')
    .isEmail().withMessage('Debe ser un email valido')
    .isEmpty().withMessage('El email es obligatorio'),
    check('password')
    .notEmpty().withMessage('Contraseña no valida'),
]


// Ruta para Ver el Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('profile_image'), validations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login', validacionesLoginUsuario,userController.loginProcess);

// Perfil de Usuario
router.get('/profile', authMiddleware, userController.profile);

// Logout
router.get('/logout', userController.logout);

// ruta de prueba para session
router.get('/usuario', function(req, res){
        if(req.session.usuario == undefined){
            res.send('No estas logueado')
        } else {
            res.send('El usuario logueado es ' + ' ' + req.session.usuario.email)
        }
})

// editar usuario
router.get('/edit/:id', userController.edit);
router.put('/:id', uploadFile.single('profile_image'), userController.update)

module.exports = router;