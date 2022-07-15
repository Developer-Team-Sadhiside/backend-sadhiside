const request = require('supertest');
const app = require('../../app');

let accessToken;
describe('POST /api/v1/users/login', () => {
  const email = 'rizki@gmail.com';
  const password = '12345';
  const notRegisteredEmail = 'rizkisaya12@gmail.com';
  it('Login user', () => request(app)
    .post('/api/v1/users/login')
    .set('Accept', 'application/json')
    .send({
      email,
      password,
    })
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    }));
  it('Login user where user have not token ', () => request(app)
    .post('/api/v1/users/login')
    .set('Accept', 'application/json')
    .send({
      email: notRegisteredEmail,
      password,
    })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        message: expect.any(String),
      });
    }));
  it('Login user where password is wrong ', () => request(app)
    .post('/api/v1/users/login')
    .set('Accept', 'application/json')
    .send({
      email,
      password: '1234',
    })
    .then((res) => {
      expect(res.statusCode).toBe(401);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));
});
