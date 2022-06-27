const productService = require("../../../services");
const userService = require("../../../services");
const imageKit = require("../../../../library/imageKit")
const {Users} = require("../../../models")


module.exports = {
  async createProducts(req, res) {
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
      const imageFormat = files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg';
      if(!imageFormat){
        res.status(400).json({
          status: "FAIL",
          message: `Wrong image format`,
        });
      }
    let imgBanyak = [];
       let img = await imageKit.upload({
        file: req.files[i].buffer,
        fileName: `IMG-${Date.now()}.${req.files[i].fieldname}`,
      });
      imgBanyak.push(img.url)
    }
    const arrImage = []; 
    //   const file = files[i];
    //   console.log(file) 
    
    // const split = await req.files[.originalname.split('.');
    // const ext = await split[split.length - 1];
    // console.log(ext)
  
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
    // arrImage.push(img.url)
    console.log(arrImage)
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
      gambar : imgBanyak,
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

  async	listAllProducts(req, res) {
    const user = await userService.api.v1.userService.get(req.params.id)
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
          pemilik: user.nama, 
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

	async updateProducts(req, res) {
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
      const imageFormat = files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg';
      if(!imageFormat){
        res.status(400).json({
          status: "FAIL",
          message: `Wrong image format`,
        });
      }
      let imgBanyak = [];
       let img = await imageKit.upload({
        file: req.files[i].buffer,
        fileName: `IMG-${Date.now()}.${req.files[i].fieldname}`,
      });
      imgBanyak.push(img.url)
    }
    const {
      nama_produk,
      harga_produk,
      kategori,
      imgBanyak,
      deskripsi,
    } = req.body
    await productService.api.v1.productService.update(req.params.id, {
      nama_produk,
      harga_produk,
      gambar : imgBanyak,
      kategori,
      deskripsi
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