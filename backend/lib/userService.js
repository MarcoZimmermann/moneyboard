var constants = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: constants.userDb, autoload: true});



function UserServiceModule() {

    this.getUserByName = function(userName) {
        return new Promise(function (resolve, reject) {
            db
              .findOne({
                name: userName
              }, function (err, item) {
                if (err) {
                  reject(err);
                } else {
                  resolve(item);
                }
              });
          });
    }
} 

module.exports = UserServiceModule;
