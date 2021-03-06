import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {getTasks} from "./api/tasks";
import NewTask from "./components/NewTask";
import Task from "./components/Task";

const App = () => {
  const [tasks, setTasks] = useState([]);
        
    useEffect(() => {
        getTasks(setTasks);
    },[]);
    
    const handleAdd = (newTask) => {
        setTasks([...tasks, newTask]);
        //TODO send task to DB
    }

    const handleRemove = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        //TODO remove from db
    }

    const toggleStatus = (task) => {
        console.log("tog stat");
        console.log(task);
        // {
        //     title,
        //     description,
        //     status: "closed",
        //     //addedDate: new Date().toLocaleString(),
        // }
    }
    
    return (
        <>
            <NewTask onAdd={handleAdd}/>
            { tasks.map((el, index) => <Task key={index} passedTask={el} onRemove={handleRemove} onStatusChange={toggleStatus} />) }
        </>
    );
};

ReactDOM.render(<App/>, document.querySelector("#app"));