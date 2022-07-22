const request = require('supertest');
const app = require('../../app');

describe('DELETE /api/v1/product/:id', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'seller@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;
  });

  it('Where delete success will get status 200', (done) => {
    request(app).delete('/api/v1/product/4') 
      .set('content-type', 'application/octet-stream')
      .set('Authorization', `Bearer ${jwtToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  it('Delete product where product not found will get status 400', (done) => {
    request(app)
      .delete('/api/v1/product/0')
      .set('Authorization', `Bearer ${jwtToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect.objectContaining({
          status: expect.any(String),
          message: expect.any(String),
        });
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
