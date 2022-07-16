const request = require('supertest');
const app = require('../../app');


describe('POST /api/v1/likes/:id', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'rizki@gmail.com',
        password: '12345',
      });
    jwtToken = loginUser.body.token;
    console.log(jwtToken);
  });
  it('like products', () => request(app)
  .post('/api/v1/likes/6')
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
  it('unlike products', () => request(app)
  .post('/api/v1/likes/6')
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
  
});
