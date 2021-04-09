import React from "react";
import { addOperationToDB } from "../api/operations";
import useInput from "../useInput";
import Operation from "./Operation";

const Operations = ({ task, operations, setOperations, showForm, toggleFormVisibility }) => {
    const [description, propsDescription, setDescription] = useInput("");
    
    const addOperation = (newOperation) => {
        setOperations(prevState => [...prevState, newOperation]);
        toggleFormVisibility();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const descriptionTrimmed = description.trim();
        if(descriptionTrimmed && descriptionTrimmed.length >= 5) {
            addOperationToDB({
                    taskId: task.id,
                    operation: {
                        description: descriptionTrimmed, 
                        timeSpent: 0
                    }
                },
                addOperation,
            );
            setDescription("");
        }
        else alert("Podaj nazwę operacji, co najmniej 5 znaków.");
    }

    const onRemoveOperation = (operationToRemove) => {
        setOperations(operations.filter(operation => operation.id !== operationToRemove.id));
    }

    return (
        <>
            { showForm &&
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Operation description"
                                {...propsDescription}
                            />

                            <div className="input-group-append">
                                <button type="submit" className="btn btn-info">
                                    Add
                                    <i className="fas fa-plus-circle ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }

            <ul className="list-group list-group-flush">
                {operations.map((operation) => <Operation key={operation.id} passedOperation={operation} onRemoveOperation={onRemoveOperation} />)}
            </ul>
        </>
    )
}

export default Operations;