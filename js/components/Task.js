import React, { useState, useEffect } from "react";
import Operations from "./Operations";
import { getOperationsFromDB } from "../api/operations";
import { updateTaskInDB } from "../api/tasks";
import { Fade } from "@material-ui/core";

const Task = ({ task, onRemoveTask }) => {
    const [isRemovable, setIsRemovable] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [operations, setOperations] = useState([]);
    const [status, setStatus] = useState(task.status);
    const [fadeIn, setFadeIn] = useState(true);

    const toggleFormVisibility = () => {
        setShowForm(prevState => !prevState);
    }

    const prepareOperations = () => {
        getOperationsFromDB(task.id, setOperations, setIsRemovable);
    }

    const toggleStatus = () => {
        const updatedTask = {
            ...task,
            status: (status === "open") ? "closed" : "open"
        }
        updateTaskInDB(updatedTask, setStatus);
    }

    const removeWithFade = () => {
        onRemoveTask(
            task.id,
            () => setFadeIn(false)
        );
    }

    useEffect(() => {
        prepareOperations();
    }, []);

    return (
        <Fade in={fadeIn}>
            <section className={"card mt-5 shadow-sm"}>
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
                            <button onClick={removeWithFade} className="btn btn-outline-danger btn-sm ml-2">
                                <i className="fas fa-trash false"></i>
                            </button>
                        }
                    </div>
                </div>

                <Operations 
                    task={task} 
                    operations={operations} 
                    setOperations={setOperations} 
                    showForm={showForm} 
                    toggleFormVisibility={toggleFormVisibility} 
                    setIsRemovable={setIsRemovable}
                    status={status}
                />
            </section>
        </Fade>
    )
}

export default Task;