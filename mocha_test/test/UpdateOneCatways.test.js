const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../../app');

describe('PUT /api/catway/:id', () => {
  it('should update the specified catway when a valid token and data are provided', (done) => {
    // Générer un jeton valide
    const token = jwt.sign({ userId: 'yourUserId' }, 'yourSecretKey', { expiresIn: '1h' });

    // Données à envoyer pour la modification du catway
    const updatedCatwayData = {
      // Ajoutez les champs que vous souhaitez mettre à jour
      catwayNumber: 1, // Exemple de mise à jour du numéro de catway
      catwayState: 'Updated catway state', // Exemple de mise à jour de l'état du catway
      type: 'long' // Exemple de mise à jour du type de catway
    };

    request(app)
      .put('/api/catway/663a321aad0538460bb2db9d') // Utilisez l'ID du catway spécifié ici
      .set('Authorization', `Bearer ${token}`)
      .send(updatedCatwayData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Vérifiez ici si la réponse contient le message de succès attendu
        done();
      });
  });

  // Ajoutez d'autres tests pour gérer différents scénarios, par exemple, lorsque le token est invalide ou manquant
});
