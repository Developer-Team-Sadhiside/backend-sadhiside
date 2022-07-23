const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'unnes',
  api_key: '453494617177447',
  api_secret: '3KjQAanvE4Yld9JMxU-gs9Gv2jk',
  secure: true,
});

module.exports = cloudinary;
