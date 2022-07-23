const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('GET /api/v1/listProducts/seller', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'seller@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;
  });

  it('List products by seller', () => request(app)
    .get('/api/v1/listProducts/seller')
    .set('authorization', `Bearer ${jwtToken}`)
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
