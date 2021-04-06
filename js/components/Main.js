
import React, { useState, useEffect } from "react";
import { getTasksFromDB, addTaskToDB, removeTaskFromDB, updateTaskInDB } from "../api/tasks";
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

    const toggleStatus = async (taskToUpdate) => {
        let newStatus = (taskToUpdate.status === "open") ? "closed" : "open";

        const error = await updateTaskInDB({
            ...taskToUpdate,
            status: newStatus
        });

        if (error) console.error("Error updating task");
        else setTasks(tasks.map(task => {
            if (task.id === taskToUpdate.id) task.status = newStatus;
            return task;
        }));
    }

    return (
        <>
            <NewTask onNewTask={handleAdd} />
            { tasks.map((el, index) => <Task key={index} passedTask={el} onRemove={handleRemove} onStatusChange={toggleStatus} />)}
        </>
    );
}

export default Main;