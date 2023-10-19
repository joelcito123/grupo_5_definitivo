const express = require('express');
const multer = require('multer');
const router = express.Router();
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users')
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + new Date().getTime() + '.' + extension)
    }
})

const upload = multer({
    storage,
})

router.get('/login', /*guestMiddleware*/ userController.login);
router.post('/login', userController.loged);
router.get('/register', /*guestMiddleware*/ userController.register);
router.post('/register', upload.single('image'), userController.registed);
router.get('/profile', /*authMiddleware*/ userController.profile);
/*
router.get('/check', (req, res) => {
     if(req.session.usuarioLogueado == undefined) {
        res.send('No estás logueado')
     } else {
        res.send('el usuario logueado es ' + req.session.usuarioLogueado.email)
     }
})
*/
module.exports = router;