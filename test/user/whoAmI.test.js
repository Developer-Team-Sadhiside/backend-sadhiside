const request = require('supertest');
const app = require('../../app');

describe('GET /api/v1/users/whoAmI', () => {
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