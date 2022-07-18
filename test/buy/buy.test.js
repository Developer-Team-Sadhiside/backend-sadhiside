const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('POST /api/v1/buy/product/:id', () => {
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

  it('Where user success offer, user will get status 200', () => request(app)
  .post('/api/v1/buy/product/1')
  .set('authorization', `Bearer ${jwtToken}`)
  .set('Accept', 'application/json')
  .then((res) => {
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        data: expect.any(Object),
      }),
    );
  }));

  it('Where user offer again, user will get status 400 ', () => request(app)
  .post('/api/v1/buy/product/1')
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
  
  it('Where user offer with product undefind , user will get status 400 ', () => request(app)
  .post('/api/v1/buy/product/0')
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
