const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('GET /api/v1/history/seller/detailOffer/:id', () => {
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
  .get('/api/v1/history/seller/detailOffer/1')
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
  it('Where seller success get offer, seller will get status 200', () => request(app)
  .get('/api/v1/history/seller/detailOffer/0')
  .set('authorization', `Bearer ${jwtToken}`)
  .set('Accept', 'application/json')
  .then((res) => {
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        message: expect.any(String),
      }),
    );
  }));
  
});