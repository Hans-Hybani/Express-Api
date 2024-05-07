const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schéma Mongoose pour les utilisateurs.
 * @typedef {object} UserSchema
 * @property {string} name - Le nom de l'utilisateur.
 * @property {string} email - L'adresse e-mail de l'utilisateur (unique).
 * @property {string} password - Le mot de passe de l'utilisateur.
 */

/**
 * Schéma Mongoose pour les utilisateurs avec validation d'unicité sur l'e-mail.
 * @type {UserSchema}
 */
const userSchema = mongoose.Schema({
  name: {type: String, require: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Plugin Mongoose pour valider l'unicité de l'e-mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);