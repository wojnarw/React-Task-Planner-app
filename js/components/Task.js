import React, { useEffect, useState } from "react";
import Operations from "./Operations";

const Task = ({passedTask, onRemove, onStatusChange}) => {
    const [task] = useState(passedTask);
    
    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{task.title}</h5>
                    <h6 className="card-subtitle text-muted">{task.description}</h6>
                </div>

                <div>
                    { task.status === "open" && (
                        <>
                            <button className="btn btn-info btn-sm mr-2">
                                Add operation
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>
                                
                            <button onClick={()=>onStatusChange(task)} className="btn btn-dark btn-sm">
                                Finish
                                <i className="fas fa-archive ml-1"></i>
                            </button>
                        </>
                    )}

                    <button onClick={()=>onRemove(task.id)} className="btn btn-outline-danger btn-sm ml-2">
                        <i className="fas fa-trash false"></i>
                    </button>
                </div>
            </div>

            <Operations task={task} />
        </section>
    )
}

export default Task;