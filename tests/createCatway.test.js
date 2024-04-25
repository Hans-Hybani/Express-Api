const axios = require('axios');
const assert = require('assert');

describe('Create Catway', () => {
  it('should create a new catway', async () => {
    const response = await axios.post('http://localhost:3000/api/catway', {
      catwayNumber: 123,
      catwayState: 'Disponible',
      type: 'Standard'
    });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.data.message, 'Catway enregistré !');
    assert.strictEqual(response.data.catwayNumber, 123);
    assert.strictEqual(response.data.catwayState, 'Disponible');
    assert.strictEqual(response.data.type, 'Standard');
  });
});
