const userService = require("../../../services");
const {Users,Products,Like} = require("../../../models");


module.exports = {
    async likeProduct(req,res,next){
        try{       
            const [getLike, newLike] = await Like.findOrCreate({
                where: {
                    id_produk: req.params.id,
                    id_pembeli: req.user.id,
                  },
            
                defaults: {
                    isLike: true,
                    id_pembeli: req.user.id ,
                    id_produk:  req.params.id ,
                }
            })
            if (newLike == false && getLike.isLike == true) {
                await Like.update({
                    isLike: false,
                }, {
                    where: {
                        id_produk: req.params.id ,
                        id_pembeli: req.user.id,
                    }
                })
            } else if (newLike == false && getLike.isLike == false) {
                await Like.update({
                    isLike: true,
                }, {
                    where: {
                        id_produk: req.params.id, 
                        id_pembeli: req.user.id,
                    }
                })

            }
            // const userLike = await likeService.api.v1.likeService.getUser(req.params.id,req.body)
            let userLike = await Like.findOne({
                where: {
                    id_produk: req.params.id ,
                    id_pembeli: req.user.id,
                }
            })

            let getLikes = await Like.findAndCountAll({
                where: {
                    isLike: true,
                    id_produk: req.params.id 
                }
            })

            const likesCount = getLikes.count;
            await Products.update({
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