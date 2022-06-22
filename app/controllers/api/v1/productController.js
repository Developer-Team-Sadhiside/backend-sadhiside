const {Users} = require("../../../models");
const productService = require("../../../services")

module.exports = {
	async createProducts(req, res) {
   const users await
		productService.api.v1.productService.addProduct(req.body)
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
						cars: data
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

// 	getCarOne(req, res) {
// 		carsService
// 			.get(req.params.id)
// 			.then((post) => {
// 				res.status(200).json({
// 					status: "OK",
// 					data: post,
// 				});
// 			})
// 			.catch((err) => {
// 				res.status(422).json({
// 					status: "FAIL",
// 					message: err.message,
// 				});
// 		});
// 	},

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