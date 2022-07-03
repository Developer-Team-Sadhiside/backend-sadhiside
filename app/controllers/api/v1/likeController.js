const userService = require("../../../services");
const {Users,produk,Like} = require("../../../models");
// const { Op } = require("sequelize");

module.exports = {
    async likeProduct(req,res,next){
        try{
            // const product = await likeService.api.v1.likeService.getProduct(req.params.id) 
            // if (!product) {
            //     res.status(404).json({
            //       status: "FAIL",
            //       message: `product not found!`,
            //     });
            //     return;
            //   } 
            // await likeService.api.v1.likeService.updateAndCountLike(req.params.id,{
            //     islike:true,
            //     include:[
            //         {
            //             model: Users,
            //             attributes: ["nama"],
            //         },
            //         {
            //             model: produk,
            //             attributes: ["nama_produk","harga_produk"],
            //         }
            //     ],
            // })
            const [getLike, newLike] = await Like.findOrCreate({
                include:[
                    {
                        model: Users,
                        attributes: ["id","nama"]
                    }
                ],
                where: {
                    id_produk: req.params.id,
                    id_pembeli: user.id,
                  },
                // where: {
                //     id_produk: req.params.id,
                //     id_pembeli: user.id
                // },
                defaults: {
                    isLike: true,
                    id_pembeli: user.id ,
                    id_produk:  req.params.id ,
                }
            })
            if (newLike == false && getLike.isLike == true) {
                await Like.update({
                    isLike: false,
                }, {
                    where: {
                        id_produk: req.params.id ,
                        id_pembeli: user.id 
                    }
                })
            } else if (newLike == false && getLike.isLike == false) {
                await Like.update({
                    isLike: true,
                }, {
                    where: {
                        id_produk: req.params.id, 
                        id_pembeli: user.id 
                    }
                })

            }
            // const userLike = await likeService.api.v1.likeService.getUser(req.params.id,req.body)
            let userLike = await Like.findOne({
                where: {
                    id_produk: req.params.id ,
                    id_pembeli: user.id ,
                }
            })

            let getLikes = await Like.findAndCountAll({
                where: {
                    isLike: true,
                    id_produk: req.params.id 
                }
            })

            const likesCount = getLikes.count;
            await produk.update({
                totalLike: likesCount
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                "status": "success",
                data: {
                    likesCount,
                    userLike
                }
            })
        } catch (err) {
            res.status(422)
            next(err)
        }
    }
}