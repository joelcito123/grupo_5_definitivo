const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

//Requiero el controlador
const userController = require('../controllers/userController');

// Requiero los Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const editValidations = require('../middlewares/loginMiddleware');

const validacionesLoginUsuario = [
    body('email')
    .notEmpty().withMessage('Debes completar el campo de email')
    .isEmail().withMessage('Debe ser un email valido'),
    body('hashed_password')
    .notEmpty().withMessage('Contraseña no valida')
    .isLength({min: 8}).withMessage("Tenés que escribir una contraseña de al menos 8 caracteres")
]


// Ruta para Ver el Formulario de registro
router.get('/register', guestMiddleware, userController.register);

// Procesar el registro
router.post('/register', uploadFile.single('profile_image'), validations, userController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, userController.login);

// Procesar el login
router.post('/login', validacionesLoginUsuario, userController.loginProcess);

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
router.put('/:id', uploadFile.single('profile_image'), editValidations, userController.update)

module.exports = router;