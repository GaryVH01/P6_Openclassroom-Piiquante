const express = require('express'); // importation du module express
const app = express(); // Création de l'application express
app.use(express.json()); // middleware pour extraire le corps des requêtes en format JSON
const connectDB = require('./dataBase');
require('dotenv').config(); // Importation de la variable d'environnement
const path = require('path'); //

//  Installation du package "cors" pour contourner les problèmes de CORS rencontrés lors des requêtes,
var cors = require('cors');
app.use(cors());

// Importation du rooting
const userRoutes = require('./routes/user'); // Importation des routes users
const sauceRoutes = require('./routes/sauce') // Importation des routes sauces

connectDB(); // connexion à la database

// Ajout des headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes); // Enregistrement des routes utilisateurs
app.use('/api/sauces', sauceRoutes); // Enregistrement des routes sauces
app.use('/images', express.static(path.join(__dirname, 'images'))); // Enregistrement des images 

module.exports = app; // Export de l'application express