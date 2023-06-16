const multer = require('multer');

// Gestion des fichiers entrants lors de la requête HTTP.

// Dictionnaire MIME_TYPES
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // Enregistrement sur le disque dur
  destination: (req, file, callback) => {
    callback(null, 'images'); // Dossier de destination : images
  },
  filename: (req, file, callback) => { 
    // Génération d'un nouveau nom pour éviter que deux fichiers aient le même nom. On split les espaces par des underscores
    const name = file.originalname.split(' ').join('_'); 
    const extension = MIME_TYPES[file.mimetype]; // Génération d'une extension au fichier grâce aux MIME_TYPES.
    callback(null, name + Date.now() + '.' + extension); // On ajoute, au nom un timestamp pour le rendre le + unique possible
  }
});

module.exports = multer({storage: storage}).single('image');