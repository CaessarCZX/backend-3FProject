const express = require("express");
const { createUser, getAllUsers, loginUser, checkWallet } = require("../controllers/userController");

const router = express.Router();

// Iniciar sesión
router.post("/login", loginUser);

// Ruta para validar una wallet
router.post("/check-wallet", checkWallet);

// Ruta para crear un usuario
router.post("/", createUser);

// Ruta para obtener todos los usuarios
router.get("/", getAllUsers);

module.exports = router;