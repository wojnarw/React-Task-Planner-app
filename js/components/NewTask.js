import React from "react";
import useInput from "../useInput";

const NewTask = ({onAdd}) => {
    const [title, propsTitle] = useInput("");
    const [description, propsDescription] = useInput("");

    const handleSubmit = () => {
        e.preventDefault();
        onAdd({
            title,
            description
        })
    }

    return (
        <div className="card shadow">
            <div className="card-body">
                <h1 className="card-title">New task</h1>
                <form onSubmit={handleSubmit}>
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
                    <button className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTask;