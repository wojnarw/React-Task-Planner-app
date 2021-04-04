import {API_KEY, API_URL} from "../api/constants";


export const getOperationsFromDB = (id) => {
    return fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
          Authorization: API_KEY,
        },
      })
      .then(resp => resp.json())
      .catch(err => console.warn(err));
  };

  export const addOperation = operation => {
      return 1;
  }

  export const addOperationToDB = async (operation, successCallback) => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
        method: "POST",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(operation)
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.error || typeof successCallback !== 'function') {
            throw new Error('Błąd!');
        }
        
        successCallback(data.data);
    })
    .catch(err => console.warn(err));
}


export const removeOperationFromDB = id => {
    fetch(`${API_URL}/operations/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => {
        if(+data.data.affected !== 1) console.error("Error removing operation from DB: " + id);
    })
    .catch(err => console.warn(err));
}