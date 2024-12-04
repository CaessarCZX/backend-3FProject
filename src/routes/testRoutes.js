const express = require("express");
const { createUser, getAllUsers, loginUser } = require("../controllers/userController");

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/", getAllUsers);

module.exports = router;