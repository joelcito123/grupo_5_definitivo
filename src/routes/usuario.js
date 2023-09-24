const express = require('express');
const multer = require('multer');
const router = express.Router();

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

router.get('/login', userController.login);
router.post('/login', userController.loged);
router.get('/register', userController.register);
router.post('/register', upload.single('image'), userController.registed);

module.exports = router;