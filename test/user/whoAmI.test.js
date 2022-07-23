const request = require('supertest');
const app = require('../../app');

describe('GET /api/v1/users/whoAmI', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'buyer@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;
  });

  it('Where unregistered user access a endpoint will get status 400', (done) => {
    request(app)
    .get('/api/v1/users/whoAmI')
    .set('content-type', 'application/octet-stream')
    .then((response) => {
    expect(response.statusCode).toBe(400);
     expect.objectContaining({
      message: expect.any(String),
    });
    done();
    })
    .catch((err) => {
    console.log(err);
    });
  });

  it('Where get a user without token will get status 400', (done) => {
    request(app)
    .get('/api/v1/users/whoAmI')
    .set('content-type', 'application/octet-stream')
    .then((response) => {
    expect(response.statusCode).toBe(400);
     expect.objectContaining({
      message: expect.any(String),
    });
    done();
    })
    .catch((err) => {
    console.log(err);
    });
  });

  it('Where get a user success will get status 201', (done) => {
    request(app)
    .get('/api/v1/users/whoAmI')
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtToken}`)
    .then((response) => {
    expect(response.statusCode).toBe(201);
     expect.objectContaining({
        status: expect.any(String),
        user: expect.any(Object),
    });
    done();
    })
    .catch((err) => {
    console.log(err);
    });
  });
});