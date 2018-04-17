var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`respond with a resources ${process.env.DB_USER}`);
});

module.exports = router;
