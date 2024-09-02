import {useEffect, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import '../App.css';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

export default function IndexPage() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3200/tasks/all').then(res => {
            if (!res.ok) {
                throw new Error("could not get tasks from backend");
            }
            console.log(res)
            return res.json();
        }).then(resData => {
            console.log(resData)
            setTasks(resData.tasks);
        })
    }, []);

    function addTask(task) {
        fetch('http://localhost:3200/tasks/addtask', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("could not add tasks to backend");
            } else {
                return res.json();

            }
        }).then(data => {
            setTasks((prevTasks) => [...prevTasks, data.task]);
            navigate('/');
        }).catch(error => {
            console.log(error);
            throw new Error("could not add tasks to backend");
        })
    }

    function deleteTask(id) {
        // console.log("deleting id:" + id);

        console.log("deleting")
        const data = {
            id: id
        }
        console.log(data)
        fetch("http://localhost:3200/tasks/deletetask", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            console.log(res)
            if (res.ok) {
                console.log("task deleted.")
                return res.json();
            }

        }).then(data => {
            console.log(data);
            const newTasks = tasks.filter((task) => task.id !== id);
            setTasks(newTasks);
            navigate('/');
        }).catch(error => {
            console.log(error)
        })

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
