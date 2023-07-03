const jwt = require("jsonwebtoken"); // package permettant d'obtenir des tokens utiles lors de l'authentification

// Middleware d'authentification = Fonction d'authentification lors de la requête au serveur
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // on récupère le token puis on divise la chaîne de caractères en tableau autour de l'espace entre bearer et token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Utilisation de la méthode verify() pour vérifier la validité du token
    const userId = decodedToken.userId; // Récupération de l'userId dans le token décodé
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error }); // Sinon message d'erreur 401 + son erreur
  }
};

/* Ce middleware permet :
- d'extraire les infos contenues dans le token,
- vérifier qu'il est  valide
- et le transmettre aux autres middelwares ou gestionnaires de routes
*/
