const User = require("../models/userModel");

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { name, email, password, referenceEmail, wallet } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios." });
        }

        const user = new User({ name, email, password, referenceEmail, wallet });
        await user.save();

        res.status(201).json({ message: "Usuario creado con éxito.", user });
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario.", error: error.message });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios.", error: error.message });
    }
};

module.exports = { createUser, getAllUsers };