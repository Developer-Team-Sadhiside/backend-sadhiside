const request = require('supertest');
const app = require('../../app');
const { Users } = require('../../app/models');

describe('Users', () => {
  let users;
  afterAll(async () => {
    users = await Users.destroy({
      where: {
        nama: 'test',
        email: 'test@gmail.com',
      },
    });
  });

  it('When user success register account will get status 202', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'test',
      email: 'test@gmail.com',
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

  it('When user register with already taken email will get status 409', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'chandra',
      email: 'test@gmail.com',
      password: '123456',
    })
    .then((res) => {
      expect(res.statusCode).toBe(409);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));

  it('When user register with already taken name will get status 409', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'buyer',
      email: 'chandra@gmail.com',
      password: '12345',
    })
    .then((res) => {
      expect(res.statusCode).toBe(409);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));

    it('When user register with empty input will get status 422', () => request(app)
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

    it('When user register with empty name will get status 422', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: '',
      email: 'chandra@gmail.com',
      password: '123456',
    })
    .then((res) => {
      expect(res.statusCode).toBe(422);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));

    it('When user register with empty email will get status 422', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'chandra',
      email: '',
      password: '123456',
    })
    .then((res) => {
      expect(res.statusCode).toBe(422);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));

  it('When user register with empty password will get status 422', () => request(app)
    .post('/api/v1/users/register')
    .set('Accept', 'application/json')
    .send({
      nama: 'chandra',
      email: 'chandra@gmail.com',
      password: '',
    })
    .then((res) => {
      expect(res.statusCode).toBe(422);
      expect.objectContaining({
        message: expect.any(String),
      });
    }));
});
