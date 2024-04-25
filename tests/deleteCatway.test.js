const assert = require('assert');
const axios = require('axios');

describe('Delete Catway', () => {
  it('should delete a specific catway', async () => {
    const catwayId = 'your-catway-id';
    const response = await axios.delete(`http://localhost:3000/api/catway/${catwayId}`);

    assert.strictEqual(response.status, 200);

    assert.strictEqual(response.data.message, 'Objet supprimé !');
  });
});
