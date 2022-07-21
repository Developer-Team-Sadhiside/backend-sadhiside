const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('GET /api/v1/history/seller', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'rizki1@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;
  });
  it('Where seller success get offer, seller will get status 200', () => request(app)
  .get('/api/v1/history/seller')
  .set('authorization', `Bearer ${jwtToken}`)
  .set('Accept', 'application/json')
  .then((res) => {
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        data: expect.any(Array),
      }),
    );
  }));
  
});