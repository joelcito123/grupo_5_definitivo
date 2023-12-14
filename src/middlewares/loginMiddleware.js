const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('first_name')
	    .notEmpty().withMessage('Tenés que escribir un nombre').bail()
		.isLength({min: 2}).withMessage("Tenés que escrbir un nombre de al menos 2 caracteres."),
	body('last_name').notEmpty().withMessage('Tenés que escribir un apellido'),
	body('profile_image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg', ".gif"];

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