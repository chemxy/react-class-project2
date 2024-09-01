import '../App.css';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import {FaEdit} from "react-icons/fa";

export default function TaskDetail() {
    const taskContext = useContext(TaskContext);
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params.taskId;
    const task = taskContext.items.find((task) => task.id === taskId)

    const [changeTaskDueDate, setChangeTaskDueDate] = useState(false);
    const [changeTaskPriority, setChangeTaskPriority] = useState(false);
    const [changeTaskStatus, setChangeTaskStatus] = useState(false);

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

    function updateTaskDueDate(event) {
        console.log(event.target.value)

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

                    <h4 className="text-cap">Due date:

                        {!changeTaskDueDate && <span> {task.dueDate}
                            <button className="icon-button">
                                <FaEdit onClick={() => setChangeTaskDueDate(true)}/>
                            </button>
                            </span>}

                        {changeTaskDueDate &&
                            <span> <input type="date" name="dueDate"
                                          onChange={(event) => updateTaskDueDate(event)}/></span>}
                    </h4>
                    <h4 className="text-cap">priority: {task.priority}
                        <button className="icon-button"><FaEdit onClick={() => setChangeTaskPriority(true)}/></button>
                    </h4>
                    <h4 className="text-cap">status: {task.status}
                        <button className="icon-button"><FaEdit onClick={() => setChangeTaskStatus(true)}/></button>
                    </h4>
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