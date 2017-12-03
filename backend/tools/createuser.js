var constans = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: 'data/test.users.db'/*constans.userDb*/, autoload: true});


  var user = {
      name: "Wesley",
      mail: "dummyMail@mail.de"      
  }

  db.insert(user);
  