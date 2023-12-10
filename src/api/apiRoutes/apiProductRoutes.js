const express = require("express");
const router = express.Router();
const apiProductController = require("../apiControllers/apiControllerProduct");

//Todos los productos
router.get("/products", apiProductController.list);

//Detalle de un producto
router.get("/products/:id", apiProductController.detail);

// categorias
router.get('/categories', apiProductController.categorias);

// imagenes

module.exports = router;