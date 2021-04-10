import { API_KEY, API_URL } from "../api/constants";

export const getOperationsFromDB = async (id, successCallback, successCallback2) => {
	try {
		const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
			headers: {
				Authorization: API_KEY,
			},
		});

		const data = await response.json();

		if (data.error || typeof successCallback !== 'function') {
			throw new Error('Błąd!');
		}

		successCallback(data.data);
        successCallback2(!(data.data.length > 0));

	} catch (err) {
		console.error(err);
	}
};

export const addOperationToDB = (payload, successCallback) => {
    fetch(`${API_URL}/tasks/${payload.taskId}/operations`, {
        method: "POST",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload.operation)
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.error || typeof successCallback !== 'function') {
                console.table(data.data.errors);
                throw new Error('Błąd!');
            }
            successCallback(data.data);
        })
        .catch(err => console.error(err));
}


export const removeOperationFromDB = (id, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.error || typeof successCallback !== 'function') {
                console.table(data.data.errors);
                throw new Error('Błąd!');
            }
            successCallback(id);
        })
        .catch(err => console.error(err));
}


export const updateOperationInDB = (operation, successCallback) => {
    return fetch(`${API_URL}/operations/${operation.id}`, {
        method: "PUT",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(operation)
    })
    .then(data => {
        if (data.error || typeof successCallback !== 'function') {
            console.table(data.data.errors);
            throw new Error('Błąd!');
        }
        successCallback(operation);
    })
    .catch(err => console.error(err));
}