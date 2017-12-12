var constants = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: constants.userDb, autoload: true});
  const bcrypt = require('bcrypt');

  module.exports = function() {
    
    this.getUser = function(userName, password) {
      return new Promise(function (resolve, reject) {
        db
          .findOne({
            name: userName
          }, function (err, user) {
            if (err || !user || !user.passWord) {
              reject(err ? err : undefined);
              return;
            }          

            bcrypt.compare(password, user.passWord, function(err, res) {
              if(!err && res===true)
                resolve (user);
              else
                reject(err);
            });
          });
      });
    }

} 


