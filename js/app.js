import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getTasksFromDB, addTaskToDB, removeTaskFromDB } from "./api/tasks";
import NewTask from "./components/NewTask";
import Task from "./components/Task";

const App = () => {
  const [tasks, setTasks] = useState([]);
        
    useEffect(() => {
        getTasksFromDB(setTasks);
    },[]);
    
    const addTaskToState = (newTask) => setTasks([...tasks, newTask]);

    const handleAdd = (newTask) => {
        addTaskToDB(newTask, addTaskToState);
    }

    const handleRemove = (id) => {
        console.log(id);
        setTasks(tasks.filter(task => task.id !== id ));
        removeTaskFromDB(id);
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
            <NewTask onNewTask={handleAdd}/>
            { tasks.map((el, index) => <Task key={index} passedTask={el} onRemove={handleRemove} onStatusChange={toggleStatus} />) }
        </>
    );
};

ReactDOM.render(<App/>, document.querySelector("#app"));