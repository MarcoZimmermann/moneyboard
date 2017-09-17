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
      .sort((a,b) => b.entryDate-a.entryDate)
      .map(function (item) {
        amount +=  parseFloat(item.value);
        return {
            value : item.value,
            description: item.description, 
            category: item.category,
            entryDate: item.entryDate// ? item.entryDate.toLocaleDateString() : ""
        };  
      });

      var result = {
        items: entries,
        amount: amount.toFixed(2)
      }

    return result;
  }
}

function validateEntry(entry) {
  if (!entry.entryDate) {
    entry.entryDate = new Date();
  }

  val = entry.value.replace(',','.');
  entry.value = parseFloat(val).toFixed(2);
  }
module.exports = myModule;
