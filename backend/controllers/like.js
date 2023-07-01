// Ce fichier contient la logique métier pour les likes et dislikes

const Sauce = require("../models/sauce");
const fs = require("fs"); // permet de modifier le système de fichiers (en autre pour gèrer la suppression des images en

// Fonction pour liker / disliker
exports.likeSauce = (req, res, next) => {
  const sauceId = req.params.id;
  const userId = req.body.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: sauceId }) // Recherche l'id du modèle sauce
    .then((sauce) => {
      if (like === 1) {
        // Si la valeur de like, dans le corps de la requête, est égal à 1 =>
        if (sauce.usersLiked.includes(userId)) {
          // On vérifie la présence d'un userId dans le tableaud des likers
          res.status(401).json({ error: "Sauce déja likée" });
        } // Si la sauce n'a pas déjà été likée, alors on ajoute un like lors de l'appui sur le like et on push l'userId dans le tableau des likers
        else {
          Sauce.updateOne(
            { _id: sauceId },
            { $inc: { likes: like }, $push: { usersLiked: userId } }
          )
            .then((sauce) => res.status(200).json({ message: "Like ajouté !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      } else if (like === -1) {
        // Si la valeur de like, dans le corps de la requête, est égal à -1 =>
        if (sauce.usersDisliked.includes(userId)) {
          // On vérifie la présence d'un userId dans le tableau des dislikers
          res.status(401).json({ error: "Sauce déja dislikée" });
        } // // Si la sauce n'a pas encore déjà eté dislikée, alors on ajoute un dislike lors de l'appui sur le dislike et on push l'userId dans le tableau des dislikers
        else {
          Sauce.updateOne(
            { _id: sauceId },
            { $inc: { dislikes: -1 * like }, $push: { usersDisliked: userId } }
          )
            .then((sauce) =>
              res.status(200).json({ message: "Dislike ajouté !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      } // Dans le cas où l'uilisateur souhaite faire machine arrière et ne plus donner son avis
      else {
        if (sauce.usersLiked.includes(userId)) {
          // On vérifie la présence d'un userId dans le tableau des likers
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          ) // On supprime son userId du tableau des likers et on retire 1 like à la sauce
            .then((sauce) => {
              res.status(200).json({ message: "Like supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(userId)) {
          // On vérifie la présence d'un userId dans le tableau des dislikers
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          ) // On supprime son userId du tableau des dislikers et on retire 1 dislike à la sauce
            .then((sauce) => {
              res.status(200).json({ message: "Dislike supprimé !" });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
