const auth = require('./authentication');
const uploader = require('./uploader');
const ImSeller = require('./credentialSeller');
const ImBuyer = require('./credentialBuyer');
const checkUser = require('./credentialCheckUser');
const uploadOnMemory = require('./uploudOnMemory');

module.exports = {
  auth,
  uploader,
  ImSeller,
  ImBuyer,
  uploadOnMemory,
  checkUser,
};
