const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
      console.log("Iniciando getAllUsers...");

      // Parámetros de paginación
      const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
      const limit = parseInt(req.query.limit) || 10; // Usuarios por página (por defecto 10)
      const skip = (page - 1) * limit; // Usuarios a saltar

      // Consultar usuarios con paginación
      const users = await User.find()
          .skip(skip)
          .limit(limit)
          .select("name email"); // Selecciona solo los campos necesarios (opcional)

      // Obtener el total de usuarios para la respuesta
      const totalUsers = await User.countDocuments();

      console.log(`Usuarios encontrados: ${users.length}`);
      res.status(200).json({
          total: totalUsers,
          page,
          pages: Math.ceil(totalUsers / limit),
          users,
      });
  } catch (error) {
      console.error("Error en getAllUsers:", error.message);
      res.status(500).json({ message: "Error al obtener usuarios.", error: error.message });
  }
};
  
  // Login usuario con JWT
  const loginUser = async (req, res) => {
    console.log("Intentando iniciar sesión...");
    try {
      const { email, password } = req.body;
      console.log("Datos recibidos:", { email });
  
      if (!email || !password) {
        console.log("Faltan datos obligatorios para el login.");
        return res.status(400).json({ message: "Por favor, ingresa todos los campos." });
      }
  
      // Buscar al usuario por email
      const user = await User.findOne({ email });
      if (!user) {
        console.log("Usuario no encontrado.");
        return res.status(401).json({ message: "Credenciales inválidas." });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Contraseña incorrecta.");
        return res.status(401).json({ message: "Credenciales inválidas." });
      }
  
      // Generar el token JWT
      console.log("Generando token JWT...");
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      console.log("Inicio de sesión exitoso.");
      res.status(200).json({
        message: "Inicio de sesión exitoso.",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Error en login:", error.message);
      res.status(500).json({ message: "Error en el servidor.", error: error.message });
    }
  };  

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { name, email, password, referenceEmail, wallet } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios." });
        }

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado." });
        }

        // Encriptar la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword, // Guardar la contraseña encriptada
            referenceEmail,
            wallet,
        });

        await user.save();

        res.status(201).json({ message: "Usuario creado con éxito.", user });
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario.", error: error.message });
    }
};

module.exports = { createUser, getAllUsers, loginUser };