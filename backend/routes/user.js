const express = require('express');
const router = express.Router();

// Importation des controllers pour l'implémentation du CRUD 
const userCtrl = require('../controllers/user');

// Implémentation du CRUD : Routes POST
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;