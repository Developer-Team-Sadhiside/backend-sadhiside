const request = require('supertest');
const path = require('path');
const app = require('../../app');
const {Products} = require('../../app/models');

const image1 = path.resolve(__dirname, '../../docs/assets/1.jpg');
// const image2= path.resolve(__dirname, '../../docs/assets/2.jpg');
// const image3 = path.resolve(__dirname, '../../docs/assets/3.jpg');
// const image4 = path.resolve(__dirname, '../../docs/assets/4.jpg');

describe('POST /api/v1/addProduct', () => {
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
  let product;
  afterAll(async () => {
    product = await Products.destroy({
      where: {
        nama_produk:'Redmi Note 10 Pro test',
        harga_produk:'3999999',
        kategori:'Hp',
        deskripsi:'Hp bagus No frem'  
      },
    });
  });

it('success create product with 201 as status code', async () => {
    return await request(app)
      .post('/api/v1/addProduct')
      .set('authorization', `Bearer ${jwtToken}`)
      .set('Content-Type', 'multipart/form-data')
      .field('nama_produk', 'Redmi Note 10 Pro error')
      .field('harga_produk', '3999999')
      .attach('gambar', image1)
    //   .attach('gambar', image2)
    //   .attach('gambar', image3)
    //   .attach('gambar', image4)
      .field('kategori', 'hp')
      .field('deskripsi', 'Hp bagus No frem')
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
  it('failed create product with 400 as status code', async () => {
    return await request(app)
    .post('/api/v1/addProduct')
    .set('authorization', `Bearer ${jwtToken}`)
    .set('Content-Type', 'multipart/form-data')
    .field('nama_produk', '')
    .field('harga_produk', '')
    .attach('gambar', )
  //   .attach('gambar', image2)
  //   .attach('gambar', image3)
  //   .attach('gambar', image4)
    .field('kategori', '')
    .field('deskripsi', '')
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });

 
});
