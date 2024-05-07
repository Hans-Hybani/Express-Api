const jwt = require('jsonwebtoken');
 
/**
 * Middleware pour vérifier et extraire les informations d'authentification à partir du token JWT.
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};