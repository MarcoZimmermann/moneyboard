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
              body: dataToSend ? JSON.stringify(dataToSend) : undefined
          })
          .then(resp=> {
              if(resp.ok && resp.status !== 204)
                  return resp.json(); 
              else if(!resp.ok || resp.status === 500) {
                //throw "Request failed";
                return Promise.reject("Request failed");
              }           
          });        

  }
}

export default Utils;