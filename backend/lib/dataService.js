var constans = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: constans.pathToDb, autoload: true});


/**
 * Datenservice, der sich um das Laden und speichern in der DB kümmert
 */
function DataServiceModule() {
  
  /**
   * Fügt einen Neuen Datensatz hinzu
   * @param {Object} entry - Fügt ein Eintrag der DB hinzu
   */
  this.insertEntry = function (entry) {
    if(!entry) 
      return;

    validateEntry(entry);
    
    db.insert(transformToDataItem(entry));
  }


  
  /**
   * Aktualisiert einen bestehenden Eintrag 
   * @param  {Object} entry - Zu aktualisierender Eintrag
   */
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

  /**
   * Gibt alle in der DB vorhanden Items zurück
   */
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

  
  /**
   * Lädt ein Eintrag mit einer bestimmten ID aus der DB
   * @param  {string} id - Identifier des zu ladenen Eintrags
   */
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
module.exports = DataServiceModule;
