var express = require('express');
var router = express.Router();
const path = require('path');

router.use('/', express.static(path.join(__dirname , '../images')));

module.exports = router;
