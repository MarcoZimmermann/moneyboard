var express = require('express');
var jwt = require('jsonwebtoken');

var services = require('../lib/services');
var dataService = services.createDataService();
var userService = services.createUserService();

var router = express.Router();

router.post('/token', function(req, res, next) {
  var entry = req.body;
    
  tryLoadUserToken(entry.user, entry.pw)
    .then(x => res.json(x), () => res.sendStatus(401));
  
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

function tryLoadUserToken(userName, userPw) {
  return new Promise(function (resolve, reject) {
    if(!userName || !userPw)
      reject();
    else{
      userService.getUser(userName,userPw).then(data => {
          if(data.name === userName) {
            var myToken = jwt.sign({ userName: data.name, info: 'asdf'}, "LaLeLu", { expiresIn: '10m' } );
            resolve(myToken);
            return;
          }
          reject();
        },
        reason=> reject(reason));
    }    
  });

  

    

  
}

module.exports = router;
