class Utils {
  constructor() {
    console.log("Woop");
  }

  getData(url) {   
   // return fetch(url).then(result => result.json());
    return this.sendData(url, null, 'GET');
    
  }

  sendData(url, dataToSend, verb) {
    if(!verb)
      verb = 'POST';

    return fetch(url, {
              method: verb,
              headers: {              
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
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