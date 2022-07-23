const request = require('supertest');
const path = require('path');
const app = require('../../app');
const { Products } = require('../../app/models');

const image1 = path.resolve(__dirname, '../../docs/assets/1.jpg');
const image2 = path.resolve(__dirname, '../../docs/assets/2.jpg');
const image3 = path.resolve(__dirname, '../../docs/assets/3.jpg');
const image4 = path.resolve(__dirname, '../../docs/assets/4.jpg');

describe('POST /api/v1/addProduct', () => {
  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'seller@gmail.com',
        password: '123456',
      });
    jwtToken = loginUser.body.token;

    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'buyernoprofile@gmail.com@gmail.com',
        password: '123456',
      });
    jwtTokenBuyer = loginUser.body.token;
  });

  let product;
  afterAll(async () => {
    product = await Products.destroy({
      where: {
        nama_produk: 'Redmi Note 10 Pro test',
        harga_produk: '3999999',
        kategori: 'Hp',
        deskripsi: 'Hp bagus ',
      },
    });
  });

  it('When user success add product will get status 201', (done) => {
    request(app).post('/api/v1/addProduct')
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtToken}`)
    .attach('gambar', image1)
    .attach('gambar', image2)
    .attach('gambar', image3)
    .attach('gambar', image4)
    .attach({
      nama_produk: 'Redmi Note 10 Pro test',
      harga_produk: '3999999',
      kategori: 'Hp',
      deskripsi: 'Hp bagus ',
    })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect.objectContaining({
        status: expect.any(String),
        data: expect.any(Object),
      });
      done();
    })
  });

  it('When buyer try access to this point will get status 400', (done) => {
    request(app).post('/api/v1/addProduct')
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtTokenBuyer}`)
    .attach('gambar', image1)
    .attach('gambar', image2)
    .attach('gambar', image3)
    .attach('gambar', image4)
    .attach({
      nama_produk: 'Redmi Note 10 Pro test',
      harga_produk: '3999999',
      kategori: 'Hp',
      deskripsi: 'Hp bagus ',
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect.objectContaining({
        status: expect.any(String),
        message: expect.any(String),
      });
      done();
    })
  });
});
