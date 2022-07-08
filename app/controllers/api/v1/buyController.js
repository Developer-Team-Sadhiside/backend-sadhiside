const buyService = require("../../../services");
const productService = require("../../../services");
const date = require("date-and-time")

module.exports = {
  async buyProduct(req,res){
    await productService.api.v1.productService.update(req.params.id, {
      status : "pending",
    })
    const now = new Date();
    const value = date.addDays(now, 24);
    const {harga_tawar} = req.body;
    await buyService.api.v1.buyService.buyProduct({
      id_produk: req.params.id,
      id_pembeli: req.user.id,
      harga_tawar,
      tanggal_pembelian: value
    })
    .then(() => {
      res.status(201).json({
        status: "Success",	
        data:{
          nama_pembeli: req.user.nama,
          harga_tawar,
          tanggal_pembelian: value,
        }
      });
    }).catch((err) => {
      res.status(400).json({
        status: "FAIL",
        message: err.message
      });
    });
  }
}
