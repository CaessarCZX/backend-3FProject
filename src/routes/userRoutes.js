const express = require("express");
const { createUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

// Ruta para crear un usuario
router.post("/", createUser);

// Ruta para obtener todos los usuarios
router.get("/", getAllUsers);

module.exports = router;