import React from "react";
import useInput from "../useInput";

const NewTask = ({onNewTask}) => {
    const [title, propsTitle] = useInput("");
    const [description, propsDescription] = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onNewTask({
            tile: title.trim(),
            description: description.trim(),
            status: "open",
            addedDate: new Date().toLocaleString(),
        })
        return false;
    }

    // const handleClick = (e) => e.preventDefault();

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title" {...propsTitle}/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="description"
                            placeholder="Description" {...propsDescription}/>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTask;