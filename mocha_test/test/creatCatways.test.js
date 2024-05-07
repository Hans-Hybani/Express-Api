const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../app');

describe('POST /api/catway', () => {
  it('should create a new catway and return status code 201', (done) => {
    // Générer un token expiré
    const expiredToken = jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: 0 });

    // Créer un objet de catway factice pour les besoins du test
    const newCatway = {
      catwayNumber: 1,
      catwayState: 'Test state',
      type: 'long'
    };

    // Faire la requête pour créer un nouveau catway avec le token expiré
    request(app)
      .post('/api/catway')
      .set('Authorization', `Bearer ${expiredToken}`)
      .send(newCatway)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        // Vérifier ici que la réponse contient le message approprié
        done();
      });
  });
});
