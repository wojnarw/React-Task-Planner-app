import {API_KEY, API_URL} from "./constants";

export const getTasks = async (successCallback) => {
    try {
      const response = await fetch(`${API_URL}/tasks/?authorisation=${API_KEY}`, {
        headers: {
          Authorization: API_KEY,
        },
      });
  
      const data = await response.json();
  
      if (data.error || typeof successCallback !== 'function') {
        throw new Error('Błąd!');
      }
  
      successCallback(data.data);
  
    } catch (err) {
      console.log(err);
    }
  };

  
  export const addTask = async (task, successCallback) => {
    
    fetch(`${API_URL}/tasks/`, {
        method: "POST",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("data:");
        console.log(data);
        console.log("typeof:");
        console.log(typeof successCallback);
        if (data.error || typeof successCallback !== 'function') {
            throw new Error('Błąd!');
        }
        
        successCallback(data.data);
    })
    .catch(err => console.warn(err));
}