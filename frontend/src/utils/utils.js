class Utils {
  constructor() {
    console.log("Woop");
  }

  getData(url) {   
   // return fetch(url).then(result => result.json());
    return startRequest('GET', url);
    
  }

  sendData(url, dataToSend, verb) {
    if(!verb)
      verb = 'POST';

      return startRequest(verb, url, dataToSend);

  }
}


function startRequest(method, url, dataToSend) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: dataToSend ? JSON.stringify(dataToSend) : undefined
    })
    .then(resp => {
        if (resp.ok && resp.status !== 204)
            return resp.json();
        else if (resp.status === 401) {
          window.location ='/login';
        }
        else if (!resp.ok || resp.status === 500) {
            //throw new Error("Request failed");
            return Promise.reject("Request failed");
        }
    });
}

export default Utils;