const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body("name")
        .notEmpty().withMessage("Es necesario poner el nombre").bail()
        .isLength({min: 5}).withMessage("Debe tener como mínimo 5 caracteres"),
    body("price")
        .notEmpty().withMessage("Es necesario poner precio").bail()
        .isInt().withMessage("El precio debe ser un número"),
    body("description")
        .notEmpty().withMessage("Es necesario poner la descripción").bail()
        .isLength({min: 20}).withMessage("La descripción debe tener al menos 20 caracteres"),
    body("category")
        .notEmpty().withMessage("Es necesario elegir una categoria").bail(),
    body("image").custom((value, { req }) => {
        let file = req.file;
		let acceptedExtensions = ['.jpg' ,'.png', '.jpeg'];

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
