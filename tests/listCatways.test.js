const assert = require('assert');
const axios = require('axios');

describe('List Catways', () => {
  it('should retrieve a list of all catways', async () => {
    const response = await axios.get('http://localhost:3000/api/catways');

    assert.strictEqual(response.status, 200);
    assert(Array.isArray(response.data));
    assert(response.data.length > 0);
  });
});
