var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
var sizeOf = require('image-size');
//mongodb

const mongoose = require('mongoose')
const Image = mongoose.model('Image')

router.use(fileUpload())

router.post('/image', function(req, res) {
  console.log('route image posted !!')
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let image = req.files.image;
  let id = randomString(10)
  let fileName = id + '-' + image.name
  image.mv(path.join(__dirname , '../images', fileName), function(err) {
    if (err)
      return res.status(500).send(err);
    let dimensions = sizeOf(image.data);
    let data = {
      slug: id,
      name: fileName,
      type: image.mimetype,
      dimensions: dimensions,
      userUpload: 'admin'
    }
    Image.create(
      data
      , (err, image) => {
        if(err) return res.status(400).send("database error")
        console.log(image)
        res.send(image)
    })
  });
});

module.exports = router;

function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}
