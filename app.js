const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const Catway = require('./models/catway');
const Reservation = require('./models/reservation');
const Users = require('./models/user');
const userCtrl = require('./controllers/log');
const userAdd = require('./controllers/log');

const auth = require('./middleware/auth');

/**
 * Connecte à la base de données MongoDB.
 * @function
 * @name connectToMongoDB
 * @param {string} uri - L'URI de connexion à la base de données MongoDB.
 * @param {object} options - Les options de configuration pour la connexion.
 * @param {boolean} options.useNewUrlParser - Indique si l'ancien parseur de chaîne de connexion doit être utilisé.
 * @param {boolean} options.useUnifiedTopology - Indique si la topologie unifiée doit être utilisée.
 * @returns {Promise<void>} Une promesse indiquant la réussite ou l'échec de la connexion.
 */
mongoose.connect('mongodb+srv://PlaisanceApi:YAFvqsdsFdTFBeTE@cluster0.x3yul8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/**
 * Middleware pour gérer les CORS (Cross-Origin Resource Sharing).
 * @function
 * @name handleCORS
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, XMLHttpRequest');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });

app.use(bodyParser.json());

// route d'authentification
app.post('/signup', cors(), userCtrl.signup);
app.post('/login', cors(), userCtrl.login);

//Cette route permet d'ajouter créer un utilisateur si et seulement si on est authentifié
app.post('/AddUser', auth, cors(), userAdd.signup);

// Route pour les catways
/**
 * Route GET pour récupérer tous les catways.
 * Aide à afficher les catways
 * @route GET /api/catways
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// GET /catways
app.get('/api/catways', auth, cors(), (req, res, next) => {
        Catway.find()
          .then(catways => res.status(200).json(catways))
          .catch(error => res.status(400).json({ error }));
      });

/**
 * Route GET pour récupérer un catway par son ID.
 * @route GET /api/catway/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// GET /catways/:id
app.get('/api/catway/:id', cors(), (req, res, next) => {
        Catway.findOne({ _id: req.params.id })
        .then(catway => res.status(200).json(catway))
        .catch(error => res.status(404).json({error}))
});

/**
 * Route POST pour créer un nouveau catway.
 * @route POST /api/catway
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// POST / catways
app.post('/api/catway', auth, cors(), (req, res, next) =>{
        const catway = new Catway({
                
                ...req.body
        })
        catway.save()
        .then(() => res.status(201).json({ message : 'Catway enregistré !'}))
        .catch(error => res.status(400).json({ error })); 
});

/**
 * Route PUT pour modifier un catway par son ID.
 * @route PUT /api/catway/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// PUT / catways /:id
app.put('/api/catway/:id', cors(), (req, res, next) => {
        Catway.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Catway modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });
app.patch('/api/catways/:id', cors(), (req, res, next) => {
        const updates = { ...req.body };
        Catway.updateOne({ _id: req.params.id }, { $set: updates })
            .then(() => res.status(200).json({ message: 'Catway modifié partiellement !' }))
            .catch(error => res.status(400).json({ error }));
    });

/**
 * Route DELETE pour supprimer un catway par son ID.
 * @route DELETE /api/catway/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// DELETE / catways/:id
app.delete('/api/catway/:id', auth, cors(), (req, res, next) => {
        Catway.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Catway supprimé !'}))
          .catch(error => res.status(400).json({ error }));
});

// Routes pour les Reservations

/**
 * Route GET pour récupérer toutes les réservations.
 * @route GET /api/reservations
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// GET / catways /:id/reservations
app.get('/api/reservations', auth, cors(), (req, res, next) => {
        Reservation.find()
          .then(reservation => res.status(200).json(reservation))
          .catch(error => res.status(400).json({ error }));
      });

/**
 * Route GET pour récupérer une réservation par son ID.
 * @route GET /api/reservation/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
//GET / catway/:id/reservations/:idReservation
app.get('/api/reservation/:id', cors(), (req, res, next) => {
        Reservation.findOne({ _id: req.params.id })
        .then(reservation => res.status(200).json(reservation))
        .catch(error => res.status(404).json({error}))
});

/**
 * Route POST pour créer une réservation pour un catway spécifié.
 * @route POST /api/catways/:id/reservations
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
//POST / catways/:id/reservations
app.post('/api/catways/:id/reservations', cors(), async (req, res, next) => {
        try {
            // Recherche du catway correspondant
            const catway = await Catway.findOne({ catwayNumber: req.body.catwayNumber });
            // Vérification si le catway existe
            if (!catway) {
                return res.status(404).json({ message: 'Le catway spécifié n\'existe pas.' });
            }
            // Création de la réservation
            const reservation = new Reservation({
                ...req.body,
                catwayNumber: req.body.catwayNumber // Ajout du numéro de catway à la réservation
            });
            // Enregistrement de la réservation
            await reservation.save();
            res.status(201).json({ message: 'Réservation enregistrée !' });
        } catch (error) {
            res.status(400).json({ error });
        }
    });

/**
 * Route DELETE pour supprimer une réservation par son ID.
 * @route DELETE /api/reservation/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */   
// DELETE / catway/:id/reservations/:idReservation
app.delete('/api/reservation/:id', auth, cors(), (req, res, next) => {
        Reservation.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Réservation supprimée !'}))
          .catch(error => res.status(400).json({ error }));
    });

// Crud pour la suppression et modification d'utilisateur 

/**
 * Route GET pour récupérer tous les utilisateurs.
 * @route GET /api/users
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
// Affichez les ustilisateur dans le tableau
app.get('/api/users', cors(), (req, res, next) => {
        Users.find()
          .then(user => res.status(200).json(user))
          .catch(error => res.status(400).json({ error }));
      });
/**
 * Route DELETE pour supprimer un utilisateur par son ID.
 * @route DELETE /api/user/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
app.delete('/api/user/:id', auth, cors(), (req, res, next) => {
        Users.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });

/**
 * Route PUT pour modifier un utilisateur par son ID.
 * @route PUT /api/user/:id
 * @param {object} req - L'objet représentant la requête HTTP.
 * @param {object} res - L'objet représentant la réponse HTTP.
 * @param {function} next - La fonction middleware suivante dans la pile des middlewares.
 * @returns {void} Ne retourne rien.
 */
app.put('/api/user/:id', cors(), (req, res, next) => {
        Users.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utulisateur modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });

module.exports = app;