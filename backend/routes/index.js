var express = require('express');
var jwt = require('jsonwebtoken');

var dataServiceModule = require('../lib/dataService');

var dataService = new dataServiceModule();
var router = express.Router();

router.post('/token', function(req, res, next) {
  var entry = req.body;
    // TODO: replace dummy
  if(entry.user === 'Wesley' && entry.pw ==="fapfapfap") {
    var myToken = jwt.sign({ userName: entry.user, info: 'asdf'}, "LaLeLu", { expiresIn: '10m' } );
    res.json(myToken);
    
  }
  else {  
    return res.sendStatus(401);
  }
})

router.get('/', function(req, res, next) {
  var queryFilter = {};
  if(req.query.startDate) {
    queryFilter.start = new Date(req.query.startDate);
    queryFilter.start.setUTCHours(0,0,0,0);    
  }
  if(req.query.endDate) {
    queryFilter.end = new Date(req.query.endDate);
    queryFilter.end.setUTCHours(23,59,59);
  }

  var items = dataService.loadEntries(queryFilter).then(function(items){
    res.json(items);
  });
})

router.get('/:id', function(req, res, next) {
  console.log(JSON.stringify(req.params));
  dataService.loadItem(req.params.id)
    .then(function(items){
      res.json(items);
    })  
})


router.put('/', function(req, res, next) {
  var entry = req.body;
  console.log(entry);

  dataService.updateEntry(entry);
  
  res.sendStatus(204);
});

router.post('/', function(req, res, next) {
  var entry = req.body;
  console.log(entry);

  dataService.insertEntry(entry);
  
  res.sendStatus(204);
});


router.delete('/:id', function(req, res, next) {
  console.log(JSON.stringify(req.params));  
  dataService.removeItem(req.params.id)
    .then(function(itemsRemoved){
      console.log("Items removed: ", itemsRemoved);
      res.sendStatus(204);
    })  
});

module.exports = router;
