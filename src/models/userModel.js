const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referenceEmail: { type: String }, // Correo del recomendador
    wallet: { type: String, unique: true, required: true },
    referenceWallet: { type: String, default: null }, // Wallet del recomendador
    referrals: [{ type: String }], // Lista de wallets de que refieres
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
