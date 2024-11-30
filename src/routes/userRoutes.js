const express = require("express");
const { createUser, getAllUsers, loginUser } = require("../controllers/userController");

const router = express.Router();

// Iniciar sesión
router.post("/login", loginUser);

// Ruta para crear un usuario
router.post("/", createUser);

// Ruta para obtener todos los usuarios
router.get("/", getAllUsers);

module.exports = router;