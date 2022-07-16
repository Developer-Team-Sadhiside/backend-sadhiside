const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('GET /api/v1/listAllProducts/Unregister', () => {

  it('List all products without auth', () => request(app)
    .get('/api/v1/listAllProducts/Unregister')
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          status: expect.any(String),
          produk: expect.any(Array),
          detail: expect.any(Object),
        }),
      );
    }));
});
