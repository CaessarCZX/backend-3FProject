const mongoose = require("mongoose");

const connectDB = async () => {
  if (isConnected) return; // Evitar múltiples conexiones

  try {
      const db = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      isConnected = db.connections[0].readyState;
      console.log("Conectado a MongoDB");
  } catch (error) {
      console.error("Error al conectar a MongoDB", error);
      throw new Error("No se pudo conectar a la base de datos.");
  }
};
