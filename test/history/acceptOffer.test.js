const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('POST /api/v1/history/seller/acceptOffer/:id', () => {
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

  it('Where user success offer, user will get status 200', () => request(app)
  .post('/api/v1/history/seller/acceptOffer/2')
  .set('authorization', `Bearer ${jwtToken}`)
  .set('Accept', 'application/json')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        data: expect.any(Object),
      }),
    );
  }));
});
