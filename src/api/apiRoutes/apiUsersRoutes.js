const express = require("express");
const router = express.Router();
const apiControllersUser = require("../apiControllers/apiControllerUser");

//Todos los usuarios
router.get("/users", apiControllersUser.list);

router.get("/users/:id", apiControllersUser.detail);

module.exports = router;
