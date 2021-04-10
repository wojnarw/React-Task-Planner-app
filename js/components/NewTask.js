import React from "react";
import useInput from "../useInput";

const NewTask = ({ onNewTask }) => {
    const [title, propsTitle, setTitle] = useInput("");
    const [description, propsDescription, setdescription] = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTitle = title.trim();
        const newDescription = description.trim();

        if (!newTitle || !newDescription) {
            alert("Podaj tytuł i opis zadania!");
            return;
        }

        onNewTask({
            title: newTitle,
            description: newDescription,
            status: "open",
        })

        setTitle("");
        setdescription("");
        
        return false;
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
                            placeholder="Title" {...propsTitle} />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="description"
                            placeholder="Description" {...propsDescription} />
                    </div>
                    <button type="submit" className="btn btn-info">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTask;