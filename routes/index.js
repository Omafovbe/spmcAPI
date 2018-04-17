var express = require('express');
var router = express.Router();
//const pump

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SPMC API' });
});

module.exports = router;
