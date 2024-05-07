const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../app');
const Catway = require('../../models/catway');

describe('GET /api/catway/:id', () => {
  it('should return status code 401 when token is expired', (done) => {
    // Générer un jeton expiré
    const expiredToken = jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: 0 });

    // Faire la requête avec le jeton expiré
    request(app)
      .get('/api/catway/yourCatwayId')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        // Vérifier ici que la réponse contient un message d'erreur approprié
        done();
      });
  });

  it('should return status code 404 for non-existing catway', (done) => {
    const fakeId = 'fakeCatwayId';

    // Générer un jeton valide pour cette requête
    const validToken = jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: '1h' });

    // Faire la requête avec un ID de catway inexistant
    request(app)
      .get(`/api/catway/${fakeId}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        // Vérifier ici que la réponse contient un message d'erreur approprié
        done();
      });
  });

  // Ajoute d'autres tests pour différents scénarios selon les cas d'utilisation
});
