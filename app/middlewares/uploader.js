const multer = require('multer');
const imageKit = require("../../library/imageKit")

  const upload = async (req,res,next) =>{
    const files = req.files;
    const imgBanyak = [];
    for (let i = 0; i < files.length; i++) {
      const imageFormat = files[i].mimetype == 'image/png' || files[i].mimetype == 'image/jpg' || files[i].mimetype == 'image/jpeg';
      if(!imageFormat){
        res.status(400).json({
          status: "FAIL",
          message: `Wrong image format`,
        });
      }
       let img = await imageKit.upload({
        file: req.files[i].buffer,
        fileName: `IMG-${Date.now()}.${req.files[i].fieldname}`,
      });
      imgBanyak.push(img.url)
    }
    req.image = imgBanyak;
    next();
   }

   module.exports = upload;