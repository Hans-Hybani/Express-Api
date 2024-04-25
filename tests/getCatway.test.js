const assert = require('assert');
const axios = require('axios');

describe('Get Catway Details', () => {
  it('should retrieve details of a specific catway', async () => {
    const catwayId = '1';
    const response = await axios.get(`http://localhost:3000/api/catway/${catwayId}`);

    assert.strictEqual(response.status, 200);
    assert(response.data); 
    assert.strictEqual(response.data._id, catwayId); 
  });
});
