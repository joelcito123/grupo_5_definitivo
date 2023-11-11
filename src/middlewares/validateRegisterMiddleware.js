const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('first_name').notEmpty().withMessage('Tenés que escribir un nombre'),
	body('last_name').notEmpty().withMessage('Tenés que escribir un apellido'),
	body('email')
		.notEmpty().withMessage('Tenés que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('hashed_password').notEmpty().withMessage('Tenés que escribir una contraseña'),
	body('profile_image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

		if (!file) {
			throw new Error('Tenés que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]