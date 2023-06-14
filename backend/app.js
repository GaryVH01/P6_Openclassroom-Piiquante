const express = require('express'); // importation du module express
const app = express();
app.use(express.json());
const connectDB = require('./dataBase');
require('dotenv').config();
const path = require('path');

// Pour contourner les problèmes de CORS rencontrés lors des requêtes, installation du package "cors"
var cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/user'); // Importation des routes users
const sauceRoutes = require('./routes/sauce') // Importation des routes sauces

connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes); // Enregistrement des routes utilisateurs
app.use('/api/sauces', sauceRoutes); // Enregistrement des routes sauces
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; // Export de l'application express