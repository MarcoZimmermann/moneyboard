var constans = require('../constants');
var dataStore = require('nedb'),
  db = new dataStore({filename: constans.entriesDb, autoload: true});

/**
 * Datenservice, der sich um das Laden und speichern in der DB kümmert
 */
function DataServiceModule() {

  /**
   * Fügt einen Neuen Datensatz hinzu
   * @param {Object} entry - Fügt ein Eintrag der DB hinzu
   */
  this.insertEntry = function (entry) {
    if (!entry) 
      return;
   
    db.insert(transformToDataItem(entry));
  }

  /**
   * Aktualisiert einen bestehenden Eintrag
   * @param  {Object} entry - Zu aktualisierender Eintrag
   */
  this.updateEntry = function (entry) {
    if (!entry) 
      return;

    var dataItem = transformToDataItem(entry);

    return new Promise(function (resolve, reject) {
      db
        .update({
          _id: dataItem._id
        }, dataItem, function (err, numReplaced) {
          if (err) {
            reject(err);
          } else {

            resolve(transformToModel(numReplaced));
          }
        });
    });
  }

  this.loadEntries = function (filter) {
    var amount = 0;

    var queries = [];

    if (filter.start) {
      queries.push({
        entryDate: {
          $gte: filter.start
        }
      });
    }
    if (filter.end) {
      queries.push({
        entryDate: {
          $lte: filter.end
        }
      });
    }
    var query = {
      $and: queries
    };

    return new Promise(function (resolve, reject) {
      db
        .find(query, function (err, items) {
          if (err) {
            reject(err);
          } else {

            var transformesItems = 
              items.sort((a, b) => b.entryDate - a.entryDate)
              .map(item => { 
                var model = transformToModel(item);
                amount += parseFloat(model.value);
                return model;
              });

            var result = {
              items: transformesItems,
              amount: amount.toFixed(2)
            }
            resolve(result);
          }
        });
    });
  }

  /**
   * Lädt ein Eintrag mit einer bestimmten ID aus der DB
   * @param  {string} id - Identifier des zu ladenen Eintrags
   */
  this.loadItem = function (id) {
    return new Promise(function (resolve, reject) {
      db
        .findOne({
          _id: id
        }, function (err, item) {
          if (err) {
            reject(err);
          } else {
            resolve(transformToModel(item));
          }
        });
    });
  }

  
  /**
   * Löscht einen Eintrag aus der DB
   * @param  {string} itemId - ID des zu löschenden Items
   */
  this.removeItem = function(itemId) {
    return new Promise(function (resolve, reject) {
      db
        .remove({ _id: itemId }, function (err, numRemoved) {
          if (err) {
            reject(err);
          } else {
            resolve(numRemoved);
          }
        });
    });
  }


}



//#region Helper
function transformToModel(item) {  
  if (!item) {
    return item;
  }
  return {
    id: item._id, 
    value: item.value, 
    description: item.description, 
    category: item.category, 
    entryDate: item.entryDate 
  };
}

function transformToDataItem(item) {
  if (!item) {
    return item;
  }

  if (!item.entryDate) 
    item.entryDate = new Date();  
  else if(! (item.entryDate instanceof Date) ) {
    item.entryDate = new Date(item.entryDate);    
  }

  var value = item.value;
  if(typeof value === 'string') {
    value = value.replace(',', '.');  
  }
  

  var dataEntry = {
    _id: item.id,
    value: Number(parseFloat(value).toFixed(2)),
    description: item.description,
    category: item.category,
    entryDate: item.entryDate
  };
  return dataEntry;
}

function validateEntry(entry, setEntryDate) {
  if (setEntryDate && !entry.entryDate) {
    entry.entryDate = new Date();
  }

  val = entry
    .value
    .replace(',', '.');
  entry.value = Number(parseFloat(val).toFixed(2));
}

//#endregion Helper

module.exports = DataServiceModule;
