const {Users} = require("../models")

module.exports = {
  async checkUserRole (req,res,next){
    try{
      const role = req.role;
      // console.log(role);
      let allow = false;
      for(let i = 0; i < role.length; i++){
        if(role[i] === "buyer"){
          allow = true
          break;
        } 
      }
      if (allow){
        next()
      }else {
        res.status(404).json({
          status: "FAIL",
          message: "You don't have permitted to access this point!",
        });
      } 
    } catch (err) {
        res.status(400).json({
          status: 'failed',
          message: [err.message]
      }) 
    } 
  }
}