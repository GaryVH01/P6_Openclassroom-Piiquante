const express = require('express');
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require('../middleware/auth');

// Importation des controllers pour l'implémentation du CRUD 
const sauceCtrl = require('../controllers/sauce'); 
const likeCtrl = require('../controllers/like');

// Implémentation du CRUD : Routes POST/GET/PUT/DELETE
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, likeCtrl.likeSauce);

// Exportationd des routes
module.exports = router;