import { API_KEY, API_URL } from "./constants";

export const getTasksFromDB = async (successCallback) => {
	try {
		const response = await fetch(`${API_URL}/tasks`, {
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
		console.error(err);
	}
};


export const addTaskToDB = async (task, successCallback) => {
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
			if (data.error || typeof successCallback !== 'function') {
				throw new Error('Błąd!');
			}

			successCallback(data.data);
		})
		.catch(err => console.warn(err));
}


export const removeTaskFromDB = id => {
	fetch(`${API_URL}/tasks/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: API_KEY,
			"Content-Type": "application/json"
		}
	})
		.then(resp => resp.json())
		.then(data => {
			if (+data.data.affected !== 1) console.error("Error removing task from DB: " + id);
		})
		.catch(err => console.warn(err));
}


export const updateTaskInDB = (task, successCallback) => {
    return fetch(`${API_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            Authorization: API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(data => {
        if (data.error || typeof successCallback !== 'function') {
            console.table(data.data.errors);
            throw new Error('Błąd!');
        }
        successCallback(task.status);
    })
    .catch(err => console.error(err));
}