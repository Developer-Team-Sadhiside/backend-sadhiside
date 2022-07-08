const productService = require("../../../services");
const userService = require("../../../services");
const imageKit = require("../../../../library/imageKit")
const {Users} = require("../../../models")


module.exports = {
  async createProducts(req, res) {
    const {
      nama_produk,
      harga_produk,
      kategori,
      deskripsi,
    } = req.body;
	  await	productService.api.v1.productService.addProduct({
      id_user : req.user.id,
      nama_produk,
      harga_produk,
      gambar : req.image,
      kategori,
      deskripsi,
      status : "tersedia"
    })
	  .then((createdproduct) => {
			res.status(201).json({
				status: "Success",	
				data: createdproduct,
			});
		}).catch((err) => {
			res.status(400).json({
				status: "FAIL",
				message: err.message,
			});
		});
  },

  async	listAllProducts(req, res) {
    productService.api.v1.productService.listAll()
			.then(({data,count}) => {
				res.status(200).json({
					status: "OK",
					produk: data,
					detail: {
						total: count
					},
				});
			})
			.catch((err) => {
				res.status(400).json({
					status: "FAIL",
					message: err.message,
				});
		});
	},

	async updateProducts(req, res) {
    const {
      nama_produk,
      harga_produk,
      kategori,
      deskripsi,
    } = req.body
    await productService.api.v1.productService.update(req.params.id, {
      nama_produk,
      harga_produk,
      gambar : req.image,
      kategori,
      deskripsi,
    })
    .then(() => {
      res.status(200).json({
        status: "OK",
      });
    })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

	async deletedProducts(req, res) {
		productService.api.v1.productService.isDeletedProducts(req.params.id)
      .then(() => {
        res.status(200).json({
			status: "Success",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

};