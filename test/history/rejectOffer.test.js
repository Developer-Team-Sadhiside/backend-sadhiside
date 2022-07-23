const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('POST /api/v1/history/seller/rejectOffer/:id', () => {
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

  it('Where seller success reject offer, seller will get status 200', () => request(app)
  .post('/api/v1/history/seller/rejectOffer/3')
  .set('authorization', `Bearer ${jwtToken}`)
  .set('Accept', 'application/json')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        message: expect.any(String),
      }),
    );
  }));

});
