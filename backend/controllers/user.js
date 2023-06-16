// Ce fichier contient la logique métier pour les utilisateurs

const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Fonction pour créer un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // On hash le password en bouclant 10 fois pour des raisons de sécurité
        .then(hash => {
            const user = new User({
                email: req.body.email, // Création d'un nouvel utilisateur et password en utilisant le modèle mongoose
                password: hash
            });
            //console.log(user);
            user.save() // On enregistre cet utilisateur dans la base de données mongoDB
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => {
                    res.status(400).json({ error })
                    console.log(error)
                });
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction pour loger un utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // On vérifie la présence de son email dans le corps de la requête
        .then(user => {
            if (!user) { // S'il n'existe pas on retourne une erreur
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // On compare l'email renseigné dans la requête et l'email enregistré dans mongoDB
                .then(valid => {
                    if (!valid) { // Si l'adresse n'est pas valide on retourne une erreur
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({ // Sinon on créé un objet JSON contenant l'userID avec son token d'authentification
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
