var constans = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: constans.pathToDb, autoload: true});



// var entry = {
//   value : 0,
//   description: '', 
//   category: '',
//   entryDate: new Date()
// };


/**
 * 
 */
function myModule() {
  
  /**
   * @param  {} entry
   */
  this.insertEntry = function (entry) {
    if(!entry) 
      return;

    validateEntry(entry);
    
    db.insert(transformToDataItem(entry));
  }

  this.updateEntry = function (entry) {
    if(!entry)
      return;

    validateEntry(entry, false);

    var dataItem = transformToDataItem(entry);
    
    return new Promise(function(resolve, reject) {      
      db.update({ _id: dataItem._id }, dataItem, function(err, numReplaced) {      
        if(err) {
            reject(err);
        } else {
          resolve(transformToModelItem(numReplaced));
        }
      });
    });    



    
  }

  this.loadEntries = function () {
    var amount = 0;
      
      var entries = db
        .getAllData()
        .sort((a,b) => b.entryDate-a.entryDate)
        .map(item=> transformToModelItem(item, x=>amount+= parseFloat(x.value)));

      var result = {
        items: entries,
        amount: amount.toFixed(2)
      }

    return result;
  }

  this.loadItem = function(id) {
    return new Promise(function(resolve, reject) {      
      db.findOne({ _id : id}, function(err, item) {      
        if(err) {
            reject(err);
        } else {
          resolve(transformToModelItem(item));
        }
      });
    });    
  }

}


/* Helper */
function transformToModelItem(item, cb) {
  if(cb) {
    cb(item);
  }
  if(!item) {
    return item;
  }

  return {
      id: item._id,
      value : item.value,
      description: item.description, 
      category: item.category,
      entryDate: item.entryDate// ? item.entryDate.toLocaleDateString() : ""
  };  
}


function transformToDataItem(item) {
  if(!item) {
    return item;
  }

  return {
      _id: item.id,
      value : item.value,
      description: item.description, 
      category: item.category,
      entryDate: item.entryDate// ? item.entryDate.toLocaleDateString() : ""
  };  
}


function validateEntry(entry, setEntryDate) {
  if (setEntryDate && !entry.entryDate) {
    entry.entryDate = new Date();
  }

  val = entry.value.replace(',','.');
  entry.value = parseFloat(val).toFixed(2);
  }
module.exports = myModule;
