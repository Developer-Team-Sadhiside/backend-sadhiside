const request = require('supertest');
const app = require('../../app');
// const { Products } = require("../../app/models");

describe('POST /api/v1/buy/product/:id', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'buyer@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;

    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'seller@gmail.com',
        password: '123456',
      });
    jwtTokenSeller = loginUser.body.token;
  });

  it('Where buyer success offer  will get status 200', () => request(app)
  .post('/api/v1/buy/product/8')
  .set('authorization', `Bearer ${jwtToken}`)
  .set('Accept', 'application/json')
  .then((res) => {
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        data: expect.any(Object),
        notif: expect.any(String),
      }),
    );
  }));

  it('Where buyer offer again with same product will get status 400 ', () => request(app)
  .post('/api/v1/buy/product/4')
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

  it('Where seller offer their product will get status 400 ', () => request(app)
  .post('/api/v1/buy/product/4')
  .set('authorization', `Bearer ${jwtTokenSeller}`)
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
