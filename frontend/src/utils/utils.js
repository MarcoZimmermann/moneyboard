class Utils {
  constructor() {
    console.log("Woop");
  }

  getData(url) {
   // var promise = fetch(url);
    return fetch(url).then(result => result.json());
    
  }

  sendData(url, dataToSend, verb) {
    if(!verb)
      verb = 'POST';

    return fetch(url, {
              method: verb,
              headers: {              
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataToSend)
          })
          .then(resp=> {
              if(resp.ok)
                  return resp.json();            
          });        

  }
}

export default Utils;