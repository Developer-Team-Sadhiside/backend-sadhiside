const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../app/models');

describe('Users', () => {
  let users;
  afterAll(async () => {
    users = await Users.destroy({
      where: {
        nama: 'rizki1',
        email: 'rizki1@gmail.com',
      },
    });
  });
  it('Register users', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'rizki1',
      email: 'rizki1@gmail.com',
      password: '12345',
    })
    .then((res) => {
      expect(res.statusCode).toBe(202);
      expect(res.body).toEqual({
        nama: expect.any(String),
        email: expect.any(String),
        role: expect.any(Array),
      });
    }));
  it('Register user with already taken email', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'chandra',
      email: 'rizki1@gmail.com',
      password: '12345',
    })
    .then((res) => {
      expect(res.statusCode).toBe(409);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));
  it('Register user with already taken name', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'rizki',
      email: 'chandra@gmail.com',
      password: '12345',
    })
    .then((res) => {
      expect(res.statusCode).toBe(409);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));

  it('Register user with empty input', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: '',
      email: '',
      password: '',
    })
    .then((res) => {
      expect(res.statusCode).toBe(422);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));
});
