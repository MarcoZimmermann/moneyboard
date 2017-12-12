var userService = require('./userService');
var dataService = require('./dataService');

module.exports = {
    createUserService : function() { return new userService();},
    createDataService: function() { return new dataService();}
}
