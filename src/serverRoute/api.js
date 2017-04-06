var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  setTimeout(() => res.json({data: 'ok'}), 200)
});

router.post('/', function(req, res, next) {

});

module.exports = router;
