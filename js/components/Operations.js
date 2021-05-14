import React, { useState } from "react";
import { addOperationToDB, removeOperationFromDB } from "../api/operations";
import useInput from "../useInput";
import Operation from "./Operation";
import { Fade, Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Operations = ({ task, operations, setOperations, showForm, toggleFormVisibility, setIsRemovable, status }) => {
    const [description, propsDescription, setDescription] = useInput("");
    const [showError, setShowError] = useState(false);

    const addOperation = (newOperation) => {
        setOperations(prevState => [...prevState, newOperation]);
        toggleFormVisibility();
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const descriptionTrimmed = description.trim();
        if (descriptionTrimmed && descriptionTrimmed.length >= 5) {
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
            setShowError(false);
        }
        else setShowError(true);
    }

    const filterOperations = (removalId) => {
        const updatedOperations = operations.filter(operation => operation.id !== removalId);
        setOperations(updatedOperations);
        if (updatedOperations.length === 0) setIsRemovable(true);
    }

    const onRemoveOperation = (operationToRemove) => {
        removeOperationFromDB(
            operationToRemove.id,
            removalId => filterOperations(removalId)
        );
    }

    return (
        <>
            <Collapse in={showForm}>
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
                    <Collapse in={showError}>
                        <Alert severity="error">Operation name needs to be at least 5 characters long!</Alert>
                    </Collapse>
                </div>
            </Collapse>

            <Fade in={true}>
                <ul className="list-group list-group-flush">
                        {operations.map((operation) => (
                            <Operation
                                key={operation.id}
                                passedOperation={operation}
                                onRemoveOperation={onRemoveOperation}
                                status={status}
                            />
                        )
                        )}
                </ul>
            </Fade>
        </>
    )
}

export default Operations;