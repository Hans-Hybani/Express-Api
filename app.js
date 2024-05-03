const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

const Catway = require('./models/catway');
const Reservation = require('./models/reservation');
const Users = require('./models/user');
const userCtrl = require('./controllers/log');
const user = require('./models/user');

const auth = require('./middleware/auth');


mongoose.connect('mongodb+srv://PlaisanceApi:YAFvqsdsFdTFBeTE@cluster0.x3yul8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, XMLHttpRequest');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
      });

app.use(bodyParser.json());

// Authentification route 
app.post('/signup', cors(), userCtrl.signup);
app.post('/login', cors(), userCtrl.login);

// Catways Route
// GET /catways
app.get('/api/catways', cors(), (req, res, next) => {
        Catway.find()
          .then(catways => res.status(200).json(catways))
          .catch(error => res.status(400).json({ error }));
      });

// GET / catways /:id
app.get('/api/catway/:id', cors(), (req, res, next) => {
        Catway.findOne({ _id: req.params.id })
        .then(catway => res.status(200).json(catway))
        .catch(error => res.status(404).json({error}))
});

// POST / catways
app.post('/api/catway', cors(), (req, res, next) =>{
        const catway = new Catway({
                
                ...req.body
        })
        catway.save()
        .then(() => res.status(201).json({ message : 'Catway enregistré !'}))
        .catch(error => res.status(400).json({ error })); 
});

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

// DELETE / catways/:id
app.delete('/api/catway/:id', cors(), (req, res, next) => {
        Catway.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
});

// Reservation Route
// GET / catways /:id/reservations, à revoir !
app.get('/api/reservations', cors(), (req, res, next) => {
        Reservation.find()
          .then(reservation => res.status(200).json(reservation))
          .catch(error => res.status(400).json({ error }));
      });

//GET / catway/:id/reservations/:idReservation
app.get('/api/reservation/:id', cors(), (req, res, next) => {
        Reservation.findOne({ _id: req.params.id })
        .then(reservation => res.status(200).json(reservation))
        .catch(error => res.status(404).json({error}))
});

//POST / catways/:id/reservations
app.post('/api/reservation', cors(), (req, res, next) =>{
        const reservation = new Reservation({
                ...req.body
        })
        reservation.save()
        .then(() => res.status(201).json({ message : 'Réservation enregistrée !'}))
        .catch(error => res.status(400).json({ error })); 
});

// DELETE / catway/:id/reservations/:idReservation
app.delete('/api/catway/:catwayId/reservations/:reservationId', cors(),(req, res, next) => {
        Reservation.deleteOne({ _id: req.params.reservationId })
            .then(() => res.status(200).json({ message: 'Réservation supprimée !' }))
            .catch(error => res.status(400).json({ error }));
    });

// Crud Route pour la suppression et modification d'utilisateur 
// Affichez les ustilisateur dans le tableau
app.get('/api/users', cors(), (req, res, next) => {
        Users.find()
          .then(user => res.status(200).json(user))
          .catch(error => res.status(400).json({ error }));
      });

// Supprimez un utilisateur
app.delete('/api/user/:id', auth, cors(), (req, res, next) => {
        Users.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });

//Modifier un utilisateur
app.put('/api/user/:id', cors(), (req, res, next) => {
        Users.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utulisateur modifié !'}))
          .catch(error => res.status(400).json({ error }));
      });

module.exports = app;