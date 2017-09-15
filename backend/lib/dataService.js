var constans = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: constans.pathToDb, autoload: true});



// var entry = {
//   value : 0,
//   description: '', 
//   category: '',
//   entryDate: new Date()
// };


function myModule() {
  this.insertEntry = function (entry) {
    validateEntry(entry);
    db.insert(entry);
  }

  this.loadEntries = function () {
    var amount = 0;
    var entries = db
      .getAllData()
      .map(function (item) {
        amount +=  parseFloat(item.value);
        return {
            value : item.value,
            description: item.description, 
            category: item.category,
            entryDate: item.entryDate ? item.entryDate.toLocaleDateString() : ""
        };  
      });

      var result = {
        items: entries,
        amount: amount
      }

    return result;
  }
}

function validateEntry(entry) {
  if (!entry.entryDate) 
    entry.entryDate = new Date();
  }
module.exports = myModule;
