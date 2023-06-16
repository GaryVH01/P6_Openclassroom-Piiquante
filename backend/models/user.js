const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création d'un modèle pour la création d'un utilisateur dans la base de données
const userSchema = mongoose.Schema({
    email : {type: String, required : true, unique :true},
    password : {type : String, required : true}
})

userSchema.plugin(uniqueValidator); // On s'assure que 2 utilisateurs ne puissent pas partager la même adresse email;

module.exports = mongoose.model('User', userSchema);