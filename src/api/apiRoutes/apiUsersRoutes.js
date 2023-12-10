const express = require("express");
const router = express.Router();
const apiControllersUser = require("../apiControllers/apiControllerUser");

//Todos los usuarios
router.get("/users", apiControllersUser.list);

//Detalle de un usuario
router.get("/users/:id", apiControllersUser.detail);

module.exports = router;
