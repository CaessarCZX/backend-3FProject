require("dotenv").config(); // Cargar variables de entorno
const connectDB = require("./src/config/db");
const app = require("./src/app");

// Conexión a la base de datos
connectDB();

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});