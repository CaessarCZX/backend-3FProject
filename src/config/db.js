const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión a MongoDB exitosa.");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1); // Salir si no se puede conectar
    }
};

module.exports = connectDB;