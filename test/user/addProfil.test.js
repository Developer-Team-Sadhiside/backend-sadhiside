const request = require('supertest');
const path = require('path');
const app = require('../../app');

const image = path.resolve(__dirname, '../../docs/assets/1.jpg');

describe('PUT /api/v1/users/addProfil', () => {
  const userLogin = {
    email:"rizki@gmail.com",
    password:"12345"
  };

  let jwtToken;
  beforeEach(async () => {
    await request(app)
      .post('/api/v1/users/login')
      .set('Content-Type', 'application/json')
      .send(userLogin)
      .then((res) => {
        jwtToken = res.body.token;
      });
  });
it('success create product with 201 as status code', async () => {
    return await request(app)
      .put('/api/v1/users/addProfil')
      .set('authorization', `Bearer ${jwtToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('kota', 'kudus')
      .field('alamat', 'sidomulyo')
      .field('no_hp', '087123444345')
      .attach('foto', image)
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });

 
});