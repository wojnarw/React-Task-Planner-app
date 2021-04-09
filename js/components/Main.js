
import React, { useState, useEffect } from "react";
import { getTasksFromDB, addTaskToDB, removeTaskFromDB } from "../api/tasks";
import NewTask from "./NewTask";
import Task from "./Task";

const Main = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasksFromDB(setTasks);
    }, []);

    const addTaskToState = (newTask) => setTasks([...tasks, newTask]);

    const handleAdd = (newTask) => {
        addTaskToDB(newTask, addTaskToState);
    }

    const handleRemove = (id) => {
        removeTaskFromDB(id);
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <>
            <NewTask onNewTask={handleAdd} />
            { tasks.map((task, index) => <Task key={index} task={task} onRemoveTask={handleRemove} />)}
        </>
    );
}

export default Main;