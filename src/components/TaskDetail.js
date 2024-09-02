import '../App.css';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import {FaEdit} from "react-icons/fa";

export default function TaskDetail() {
    const taskContext = useContext(TaskContext);
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params.taskId;
    const [task, setTask] = useState();

    const [changeTaskDueDate, setChangeTaskDueDate] = useState(false);
    const [changeTaskPriority, setChangeTaskPriority] = useState(false);
    const [changeTaskStatus, setChangeTaskStatus] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3200/tasks/id/' + taskId).then(res => {
            if (!res.ok) {
                throw new Error("could not get task from backend");
            }
            console.log(res)
            return res.json();
        }).then(resData => {
            console.log(resData)
            setTask(resData.task);
        })
    }, []);

    function handleDelete() {
        // taskContext.deleteItem(taskId);
        console.log("deleting")
        const data = {
            id: taskId
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
            navigate('/tasks');
        }).catch(error => {
            console.log(error)
        })
    }

    function updateTaskDueDate(event) {
        const newValue = event.target.value;
        console.log(newValue);
        const body = {
            id: task.id,
            updateType: "dueDate",
            newValue: newValue
        }
        fetch("http://localhost:3200/tasks/updatetask", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            // console.log(res)
            if (res.ok) {
                console.log("task due date updated.")
                return res.json();
            }
        }).then(data => {
            console.log(data);
            setTask(data.task);
            setChangeTaskDueDate(false);
        }).catch(error => {
            console.log(error)
        })
    }

    function updateTaskPriority(event) {
        const newValue = event.target.value;
        console.log(newValue);
        const body = {
            id: task.id,
            updateType: "priority",
            newValue: newValue
        }
        fetch("http://localhost:3200/tasks/updatetask", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            // console.log(res)
            if (res.ok) {
                console.log("task priority updated.")
                return res.json();
            }
        }).then(data => {
            console.log(data);
            setTask(data.task);
            setChangeTaskPriority(false);
        }).catch(error => {
            console.log(error)
        })
    }

    function updateTaskStatus(event) {
        const newValue = event.target.value;
        console.log(newValue);
        const body = {
            id: task.id,
            updateType: "status",
            newValue: newValue
        }
        fetch("http://localhost:3200/tasks/updatetask", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            // console.log(res)
            if (res.ok) {
                console.log("task status updated.")
                return res.json();
            }
        }).then(data => {
            console.log(data);
            setTask(data.task);
            setChangeTaskStatus(false);
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

                    <h4 className="text-cap">priority:
                        {!changeTaskPriority && <span> {task.priority}
                            <button className="icon-button">
                                <FaEdit onClick={() => setChangeTaskPriority(true)}/>
                            </button>
                        </span>
                        }

                        {changeTaskPriority &&
                            <span> <select className="text-cap" name="priority"
                                           defaultValue={task.priority}
                                           onChange={(event) => updateTaskPriority(event)}>
                                    <option value="low">low</option>
                                    <option value="high">high</option>
                                </select>
                            </span>}
                    </h4>

                    <h4 className="text-cap">status:
                        {!changeTaskStatus && <span> {task.status}
                            <button className="icon-button"><FaEdit onClick={() => setChangeTaskStatus(true)}/></button></span>}

                        {changeTaskStatus && <span> <select className="text-cap" name="status"
                                                            defaultValue={task.status}
                                                            onChange={(event) => updateTaskStatus(event)}>
                                    <option value="new">new</option>
                                    <option value="in progress">in progress</option>
                                    <option value="done">done</option>
                            </select>
                        </span>}
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