const auth = require('./authentication');
const uploader = require('./uploader');
const checkUser = require('./credentialCheckUser');
const uploadOnMemory = require('./uploudOnMemory');

module.exports = {
  auth,
  uploader,
  uploadOnMemory,
  checkUser,
};
