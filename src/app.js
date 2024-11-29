const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use("/f3api/users", userRoutes);

module.exports = app;