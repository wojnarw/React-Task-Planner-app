
import React, { useState, useEffect } from "react";
import { getTasksFromDB, addTaskToDB, removeTaskFromDB } from "../api/tasks";
import NewTask from "./NewTask";
import Task from "./Task";

const Main = () => {
    const [tasks, setTasks] = useState([]);

    const reverseOrderTasks = tasks => {
        const reversedTasks = tasks.reverse();
        setTasks(reversedTasks);
    }

    useEffect(() => {
        getTasksFromDB(reverseOrderTasks);
    }, []);

    const addTaskToState = (newTask) => {
        delete newTask.apiKey; // this property, when sent causes API server error
        setTasks([newTask, ...tasks])
    };

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
            { tasks.map((task) => <Task key={task.id} id={task.id} task={task} onRemoveTask={handleRemove} />)}
        </>
    );
}

export default Main;