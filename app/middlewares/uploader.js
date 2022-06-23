const multer = require('multer')
const upload = multer()
const storage = multer.memoryStorage();

module.exports = upload,storage