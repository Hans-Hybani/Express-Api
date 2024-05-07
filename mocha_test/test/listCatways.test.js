const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../app');

describe('GET /api/catways', () => {
  it('should return status code 401 when token is expired', (done) => {
    // Générer un jeton expiré
    const expiredToken = jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: 0 });

    // Faire la requête avec le jeton expiré
    request(app)
      .get('/api/catways')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
