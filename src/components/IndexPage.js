import {useEffect, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import '../App.css';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

export default function IndexPage() {

    // const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    function addTask(task) {
        setTasks((prevTasks) => [...prevTasks, data.task]);
    }

    function deleteTask(id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    const TaskContextValue = {
        items: tasks,
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
