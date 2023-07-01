const mongoose = require("mongoose");

// Déclaration d'une fonction asynchrone pour la connexion à la database (NoSQL) mongoDB
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));
};

module.exports = connectDB; // Exportation de la fonction dans l'app express
