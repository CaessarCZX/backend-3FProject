require("dotenv").config(); // Cargar variables de entorno
const connectDB = require("./src/config/db");
const app = require("./src/app");
const cors = require("cors"); // Importar cors

// Configuración de CORS
const corsOptions = {
    origin: "http://localhost:3000", // Permitir solo el origen localhost:3000
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
    credentials: true, // Si se requieren cookies o cabeceras de autorización
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