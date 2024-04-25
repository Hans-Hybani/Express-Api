const assert = require('assert');
const axios = require('axios');

describe('Update Catway', () => {
  it('should update the state description of a specific catway', async () => {
    const catwayId = '1'; 
    const newStateDescription = 'Nouvelle description de l\'état'; 
    const response = await axios.put(`http://localhost:3000/api/catway/${catwayId}`, {
      catwayState: newStateDescription
    });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data.message, 'Catway modifié !');
  });
});
