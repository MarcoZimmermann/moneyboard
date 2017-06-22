var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({value: 12.24});
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.json({text:"Woop"});
});

module.exports = router;
