const mongoose = require("mongoose");

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log("Ya conectado a MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("Conectado a MongoDB:", db.connections[0].name);
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    throw error;
  }
};

module.exports = connectDB;