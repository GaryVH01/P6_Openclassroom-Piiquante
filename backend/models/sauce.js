const mongoose = require("mongoose"); // importation de mongoose pour création d'un modèle

// Création d'un modèle pour la création d'une sauce dans la base de données
const sauceSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  {
    timestamps: true, // ajout des propriétés: date de création et de modification dans la base de données
  }
);

module.exports = mongoose.model("Sauce", sauceSchema); // export du modèle sauce
