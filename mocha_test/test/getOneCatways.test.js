const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../app');
const Catway = require('../../models/catway');

describe('GET /api/catway/:id', () => {
  it('should return the specified catway when a valid token is provided', (done) => {
    // Générer un jeton valide
    const token = jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: '1h' });

    request(app)
      .get('/api/catway/663a321aad0538460bb2db9d') 
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Vérifiez ici si la réponse contient les données attendues pour le catway spécifié
        done();
      });
  });

  // Ajoutez d'autres tests pour gérer différents scénarios, par exemple, lorsque le token est invalide ou manquant
});
