// Ce fichier contient la logique métier pour les sauces

const Sauce = require("../models/sauce");
const fs = require("fs"); // permet de modifier le système de fichiers (en autre pour gèrer la suppression des images en local)

// Fonction pour créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; // suppression de l'id généré automatiquement par la base de données
  delete sauceObject._userId; // suppression de l'id de l'user car on souhaite utiliser l'userId du token d'authentification
  const sauce = new Sauce({
    ...sauceObject, // utilisation du raccourci spread (opérateur) pour copier les champs du body de la requête
    //userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save() // enregistrement de l'objet Sauce dans la base de données
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Fonction pour retrouver une sauce en particulier
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // Avec la méthode findOne on récupère une seule grâce à son id
    .then((sauce) => res.status(200).json(sauce)) // On renvoie l'objet sauce
    .catch((error) => res.status(404).json({ error: error })); // Sinon on renvoie une erreur 404
};

// Fonction pour modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce), // on récupère l'objet
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, // URL de l'image
      }
    : { ...req.body }; // Si aucun objet n'est transmit, on récupère l'objet du corps de la requête
  console.log(sauceObject);
  delete sauceObject._userId; // Suppression de l'userId par mesure de sécurité
  Sauce.findOne({ _id: req.params.id }) // Récupération de l'objet dans la base de données
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Accès refusé" });
      } else {
        // Si l'utilisateur a la permission
        Sauce.updateOne(
          // Mise à jour de la sauce
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Fonction de suppression d'une sauce par son auteur
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // On récupère l'objet dans la base de données
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        // On vérifie si la personne qui souhaite supprimer la sauce est bien celle qui l'a créée
        res.status(401).json({ message: "Accès refusé" });
      } else {
        // Si oui
        const filename = sauce.imageUrl.split("/images/")[1]; // on récupère l'url de l'image pour la supprimer
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id }) // Puis on supprime la sauce de la base de données
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Fonction permettant de récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find() // utilisation de la méthode find pour récupérer la liste complète des sauces
    .then((sauces) => res.status(200).json(sauces)) // on renvoie le tableau de toutes les sauces
    .catch((error) => res.status(400).json({ error: error })); // sinon on renvoie une erreur 400
};
