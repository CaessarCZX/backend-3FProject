require("dotenv").config(); // Cargar variables de entorno
const connectDB = require("./src/config/db");
const app = require("./src/app");
const cors = require("cors"); // Importar cors

// Configuración de CORS
const corsOptions = {
    origin: ["http://localhost:3000", "https://backend-3-f-project.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

// Conexión a la base de datos
connectDB();

// Habilitar CORS para todas las rutas con la configuración personalizada
app.use(cors(corsOptions));

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});