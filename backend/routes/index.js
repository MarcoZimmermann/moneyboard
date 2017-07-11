var express = require('express');
var router = express.Router();
var items = [{value: 12.24, description : "Item1"}, {value: 39.99, description : "Item2"}, {value: 65, description : "Item3"}, {value: 160.11}];

router.get('/', function(req, res, next) {
  res.json(items);
})

router.get('/test', function(req, res, next) {
  res.json({value: 12.24});
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  items.push(req.body);
  res.sendStatus(204);
});

module.exports = router;
