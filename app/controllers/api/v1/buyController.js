const buyService = require("../../../services");
const productService = require("../../../services");
const historyService = require("../../../services");
const date = require("date-and-time")

module.exports = {
  async buyProduct(req,res){
    try{
      const product = await productService.api.v1.productService.findProduct(req.params.id)
      if(!product){
        throw new Error ("Product not found")
      }
      await productService.api.v1.productService.update(req.params.id, {
        status: "pending",
      })
      const now = new Date();
      const value = date.addDays(now,12);
      const {harga_tawar} = req.body;
      const purchase = await buyService.api.v1.buyService.buyProduct({
        id_produk: req.params.id,
        id_pembeli: req.user.id,
        harga_tawar,
        tanggal_pembelian: value
      })
      // const purchase = await historyService.api.v1.historyService.getBid(req.user.id,req.params.id)
      // console.log(purchase)
      await buyService.api.v1.buyService.createHistory({
        id_pembelian: purchase.id,
        id_penjual: product.id_user,
        id_pembeli: req.user.id
      })
      res.status(201).json({
        status: "Success",	
        data: {
          nama_pembeli: req.user.nama,
          harga_tawar,
          tanggal_pembelian: value,
        }
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }

    // .then(() => {
    //   res.status(201).json({
    //     status: "Success",	
    //     data:{
    //       nama_pembeli: req.user.nama,
    //       harga_tawar,
    //       tanggal_pembelian: value,
    //     }
    //   });
    // }).catch((err) => {
    //   res.status(400).json({
    //     status: "FAIL",
    //     message: err.message
    //   });
    // });
  }
}

