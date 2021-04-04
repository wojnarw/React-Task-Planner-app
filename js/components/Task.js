import React, { useState } from "react";
import Operations from "./Operations";

const Task = ({ passedTask, onRemove, onStatusChange }) => {
    const [isRemovable, setIsRemovable] = useState(false);

    const checkIfRemovable = (condition) => {
        setIsRemovable(!condition);
    }

    const setForm = (isVisible) => {
        return !isVisible;
    }

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{ passedTask.title }</h5>
                    <h6 className="card-subtitle text-muted">{ passedTask.description }</h6>
                </div>

                <div>
                    { passedTask.status === "open" && (
                        <>
                            <button onClick={setForm} className="btn btn-info btn-sm mr-2">
                                Add operation
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                                
                            <button onClick={ ()=> onStatusChange(passedTask) } className="btn btn-dark btn-sm">
                                Finish
                                <i className="fas fa-archive ml-1"></i>
                            </button>
                        </>
                    )}
                    { passedTask.status === "closed" && (
                        <button onClick={ ()=> onStatusChange(passedTask) } className="btn btn-dark btn-sm">
                            Restart
                            <i className="fas fa-archive ml-1"></i>
                        </button>
                    )}
                    { isRemovable &&
                        <button onClick={ ()=> onRemove(passedTask.id) } className="btn btn-outline-danger btn-sm ml-2">
                            <i className="fas fa-trash false"></i>
                        </button>
                    }
                </div>
            </div>

            <Operations task={passedTask} hasOperations={checkIfRemovable} form={setForm()} />
        </section>
    )
}

export default Task;