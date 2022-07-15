const request = require("supertest");
const path = require("path");
const app = require("../../app");

const image1 = path.resolve(__dirname, "../../docs/assets/1.jpg");
const image2 = path.resolve(__dirname, "../../docs/assets/2.jpg");
const image3 = path.resolve(__dirname, '../../docs/assets/3.jpg');
const image4 = path.resolve(__dirname, '../../docs/assets/4.jpg');

describe("PUT /api/v1/product/:id", () => {

  let jwtToken;
  beforeAll(async () => {
    loginUser = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: "rizki@gmail.com",
        password: "12345",
      });
    jwtToken = loginUser.body.token;
  })

  it("Update product where update success will get status 200", function (done) {
    request(app)
    .put("/api/v1/product/1")
    .set('content-type', 'application/octet-stream')
    .set('Authorization', `Bearer ${jwtToken}`)
    .attach("gambar", image1)
    .attach("gambar", image2)
    .attach("gambar", image3)
    .attach("gambar", image4)
    .attach({
      nama_produk: "Redmi Note 10 Pro edit",
      harga_produk: "4999999",
      kategori: "Hp",
      deskripsi: "Hp bagus",
    })
    .then(response => {
      expect(response.statusCode).toBe(200);
      done()
    })
    .catch(err => {
      console.log(err)
    })
  })
  it('Delete product where product not found will get status 400', (done) => {
    request(app)
    .delete('/api/v1/product/1')
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
