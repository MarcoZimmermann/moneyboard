var express = require('express');
var dataServiceModule = require('../lib/dataService');

var dataService = new dataServiceModule();
var router = express.Router();


router.get('/', function(req, res, next) {
  var items = dataService.loadEntries();
  res.json(items);
})

router.get('/:id', function(req, res, next) {
  console.log(JSON.stringify(req.params));
  dataService.loadItem({"_id": req.params.id})
    .then(function(items){
      res.json(items);
    })
  
})




router.post('/', function(req, res, next) {
  var entry = req.body;
  console.log(entry);

  dataService.insertEntry(entry);
  
  res.sendStatus(204);
});

module.exports = router;
