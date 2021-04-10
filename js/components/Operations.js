import React from "react";
import { addOperationToDB, removeOperationFromDB } from "../api/operations";
import useInput from "../useInput";
import Operation from "./Operation";

const Operations = ({ task, operations, setOperations, showForm, toggleFormVisibility, setIsRemovable, status }) => {
    const [description, propsDescription, setDescription] = useInput("");
    
    const addOperation = (newOperation) => {
        setOperations(prevState => [...prevState, newOperation]);
        toggleFormVisibility();
    }

    const handleAdd = (e) => {
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
            setIsRemovable(false);
        }
        else alert("Podaj nazwę operacji, co najmniej 5 znaków.");
    }

    const filterOperations = (removalId) => {
        const updatedOperations = operations.filter(operation => operation.id !== removalId);
        setOperations(updatedOperations);
        if(updatedOperations.length === 0) setIsRemovable(true);
    }

    const onRemoveOperation = (operationToRemove) => {
        removeOperationFromDB(
            operationToRemove.id, 
            removalId => filterOperations(removalId)
        );
    }

    return (
        <>
            { showForm &&
                <div className="card-body">

                    <form onSubmit={handleAdd}>
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
                {operations.map((operation) => {
                    return <Operation 
                                key={operation.id} 
                                passedOperation={operation} 
                                onRemoveOperation={onRemoveOperation} 
                                status={status}
                            />
                })}
            </ul>
        </>
    )
}

export default Operations;