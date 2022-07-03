const {Products} = require("../../../models")

module.exports = {
    async findById(id){
        return await Products.findByPk(id)
    },

    // async findUser(id_produk,id_sender){
    //     where : {
    //         id_produk : req.params.id,

    //     }
    // }
}