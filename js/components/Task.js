import React, { useState, useEffect } from "react";
import Operations from "./Operations";
import { getOperationsFromDB } from "../api/operations";
import { updateTaskInDB } from "../api/tasks";

const Task = ({ task, onRemoveTask }) => {
    const [isRemovable, setIsRemovable] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [operations, setOperations] = useState([]);
    const [status, setStatus] = useState(task.status);

    const toggleFormVisibility = () => {
        setShowForm(prevState => !prevState);
    }

    const prepareOperations = async () => {
        const response = await getOperationsFromDB(task.id);
        if (response.error) console.warn("Error getting operations from database!");
        else {
            setOperations(response.data);
            setIsRemovable(!(response.data.length > 0));
        }
    }

    const toggleStatus = async () => {
        console.log(task.status);
        console.log(status);
        let newStatus = (status === "open") ? "closed" : "open";
        const error = await updateTaskInDB({
            ...task,
            status: newStatus
        });
        if (error) console.error("Error updating task");
        else setStatus(newStatus);
    }

    useEffect(() => {
        prepareOperations();
    }, []);

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{task.title}</h5>
                    <h6 className="card-subtitle text-muted">{task.description}</h6>
                </div>

                <div>
                    {status === "open" && (
                        <button onClick={toggleFormVisibility} className="btn btn-info btn-sm mr-2">
                            Add operation
                            <i className="fas fa-plus-circle ml-1"></i>
                        </button>
                    )}

                    <button onClick={toggleStatus} className="btn btn-dark btn-sm">
                        {status === "open" ? "Finish" : "Restart"}
                        <i className="fas fa-archive ml-1"></i>
                    </button>

                    {isRemovable &&
                        <button onClick={() => onRemoveTask(task.id)} className="btn btn-outline-danger btn-sm ml-2">
                            <i className="fas fa-trash false"></i>
                        </button>
                    }
                </div>
            </div>

            <Operations task={task} operations={operations} setOperations={setOperations} showForm={showForm} toggleFormVisibility={toggleFormVisibility} />
        </section>
    )
}

export default Task;