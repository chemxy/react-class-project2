import {useEffect, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import '../App.css';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

export default function IndexPage() {

    // const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:3200/tasks/all').then(res => {
    //         if (!res.ok) {
    //             throw new Error("could not get tasks from backend");
    //         }
    //         console.log(res)
    //         return res.json();
    //     }).then(resData => {
    //         console.log(resData)
    //         setTasks(resData.tasks);
    //     })
    // }, []);

    function updateTasks(newTasks) {
        setTasks(newTasks);
    }

    function addTask(task) {
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    function deleteTask(id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    const TaskContextValue = {
        items: tasks,
        updateItems: updateTasks,
        addItem: addTask,
        deleteItem: deleteTask,
    }

    return (
        <TaskContext.Provider value={TaskContextValue}>
            <div className="App">
                <div className="app-wrapper flex-row">
                    <div className="left">
                        <NavBar></NavBar>
                    </div>
                    <div className="right">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </TaskContext.Provider>
    );
}
