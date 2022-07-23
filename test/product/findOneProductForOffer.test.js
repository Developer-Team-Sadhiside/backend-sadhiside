const request = require('supertest');
const app = require('../../app');

describe('GET /api/v1/getOneProductWhenOffer/:id', () => {
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

  it('Where get a product available will get status 200', (done) => {
    request(app)
    .get('/api/v1/getOneProductWhenOffer/1')
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtToken}`)
    .then((response) => {
    expect(response.statusCode).toBe(200);
     expect.objectContaining({
        status: expect.any(String),
        produk: expect.any(Object),
        ket: expect.any(String)
    });
    done();
    })
    .catch((err) => {
    console.log(err);
    });
  });

  it('Where get a product who is buyer buy it before will get status 200', (done) => {
    request(app)
    .get('/api/v1/getOneProductWhenOffer/4')
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtToken}`)
    .then((response) => {
    expect(response.statusCode).toBe(200);
     expect.objectContaining({
        status: expect.any(String),
        produk: expect.any(Object),
        ket: expect.any(String)
    });
    done();
    })
    .catch((err) => {
    console.log(err);
    });
  });
  
  it('Where get a product pending will get status 200', (done) => {
    request(app)
    .get('/api/v1/getOneProductWhenOffer/5')
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtToken}`)
    .then((response) => {
    expect(response.statusCode).toBe(200);
     expect.objectContaining({
        status: expect.any(String),
        produk: expect.any(Object),
        ket: expect.any(String)
    });
    done();
    })
    .catch((err) => {
    console.log(err);
    });
  });

  it('Where product cant found will get status 400', (done) => {
    request(app)
    .get('/api/v1/getOneProduct/0')
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
