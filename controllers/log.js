const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

/**
 * Fonction pour inscrire un nouvel utilisateur.
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name : req.body.name,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
/**
 * Fonction pour connecter un utilisateur existant.
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                        { userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn : '24h'}
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};