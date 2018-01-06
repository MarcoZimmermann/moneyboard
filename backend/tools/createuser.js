var constans = require('../constants');
const bcrypt = require('bcrypt');

//const filename = constans.userDb;
const filename = 'data/test.users.db';

var dataStore = require('nedb'),
  db = new dataStore({filename: filename, autoload: true});

  let hash = bcrypt.hashSync('dummyPassWord', 10);
  var user = {
      name: "Wesley",
      mail: "myDummyMail@dummyMail.de",
      passWord: hash    
  }

  db.insert(user);
  