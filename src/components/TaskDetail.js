import '../App.css';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useContext} from "react";
import {TaskContext} from "../store/TaskContext";

export default function TaskDetail() {
    const taskContext = useContext(TaskContext);
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params.taskId;
    const task = taskContext.items.find((task) => task.id === taskId)

    function handleDelete() {
        taskContext.deleteItem(taskId);
        console.log("deleting")
        const data = {
            id: taskId
        }
        console.log(data)
        fetch("http://localhost:3200/deletetask", {
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
        }).catch(error => {
            console.log(error)
        })
    }

    if (task) {
        return (
            <div>
                <div>
                    <NavLink to="/tasks">
                        <button className="primary-button text-cap">back</button>
                    </NavLink>
                </div>
                <div>
                    <h1>{task.title}</h1>
                    <h4 className="text-cap">created date: {task.createdDate}</h4>
                    <h4 className="text-cap">Due date: {task.dueDate}</h4>
                    <h4 className="text-cap">priority: {task.priority}</h4>
                    <h4 className="text-cap">status: {task.status}</h4>
                    <br/>
                    <p>{task.description}</p>
                    <br/>
                    <button className="primary-button text-cap" onClick={handleDelete}>delete</button>
                </div>
            </div>
        );
    } else {
        navigate('/');
    }

}