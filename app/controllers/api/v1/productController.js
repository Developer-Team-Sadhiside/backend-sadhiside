const productService = require("../../../services");
// const userService = require("../../../services");
const imageKit = require("../../../../library/imageKit")
const {Users} = require("../../../models")


module.exports = {
  async createProducts(req, res) {
    const file = req.file;
    const imageFormat = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg';
      if(!imageFormat){
        res.status(400).json({
          status: "FAIL",
          message: `Wrong image format`,
        });
      }
    const split = await req.file.originalname.split('.');
    const ext = await split[split.length - 1];
    let img1 = await imageKit.upload({
      file: req.file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`
    });
    // console.log(img1.url)
    // let img2 = await imageKit.upload({
    //   file: req.file.buffer,
    //   fileName: `IMG-${Date.now()}.${ext}`
    // });
    // console.log(img2.url)
    // let img3 = await imageKit.upload({
    //   file: req.file.buffer,
    //   fileName: `IMG-${Date.now()}.${ext}`
    // });
    // console.log(img3.url)
    const {
      id_user,
      nama_produk,
      harga_produk,
      kategori,
      deskripsi,
    } = req.body;
	  await	productService.api.v1.productService.addProduct({
      id_user,
      nama_produk,
      harga_produk,
      gambar1 : img1.url,
      // gambar2 : img2.url,
      // gambar3 : img3.url,
      kategori,
      deskripsi
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

	listAllProducts(req, res) {
    productService.api.v1.productService.listAll({
      include: [
        {
          model: Users,
          attributes: ["nama"],
        },
      ],
			})
			.then(({data,count}) => {
				res.status(200).json({
					status: "OK",
					data: {
						produk: data
					},
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

	updateProducts(req, res) {
        productService.api.v1.productService.update(req.params.id, req.body)
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

	deletedProducts(req, res) {
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