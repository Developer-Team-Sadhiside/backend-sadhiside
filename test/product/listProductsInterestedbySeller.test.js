const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('GET /api/v1/listProducts/seller/interested', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'rizki@gmail.com',
        password: '12345',
      });
    jwtToken = loginUser.body.token;
  });

  it('List products interested by seller', () => request(app)
    .get('/api/v1/listProducts/seller/interested')
    .set('authorization', `Bearer ${jwtToken}`)
    .set('Accept', 'application/json')
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          status: expect.any(String),
          produk: expect.any(Object),
        }),
      );
    }));
});