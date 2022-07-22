const request = require('supertest');
const app = require('../../app');


describe('POST /api/v1/likes/:id', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'buyer@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;
    console.log(jwtToken);
  });

  it('Where user success like product will get 200', () => 
  request(app)
  .post('/api/v1/likes/1')
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

  it('Where user success unlike product will get 200', () => request(app)
  .post('/api/v1/likes/1')
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
