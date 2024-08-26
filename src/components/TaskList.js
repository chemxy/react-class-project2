import '../App.css';
import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import {NavLink, useNavigate} from "react-router-dom";

export default function TaskList() {

    const taskContext = useContext(TaskContext)
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        console.log(taskContext.items)
        setTasks(taskContext.items);
    }, []);

    function onSelectTask(id) {
        navigate(`${id}`);
    }

    function filterTasks(event) {
        console.log("filter tasks: " + event.target.value)
        const filterValue = event.target.value;
        switch (filterValue) {
            case 'all':
                setTasks(taskContext.items);
                break;
            case 'new':
                const newProjects = taskContext.items.filter(project => project.status === 'NEW');
                setTasks(newProjects);
                break;
            case 'high':
                const highPriorityProjects = taskContext.items.filter(project => project.priority === 'HIGH');
                setTasks(highPriorityProjects);
                break;
            case 'low':
                const lowPriorityProjects = taskContext.items.filter(project => project.priority === 'LOW');
                setTasks(lowPriorityProjects);
                break;
            case 'dueToday':
                const todayTasks = taskContext.items.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
                setTasks(todayTasks);
                break;
            case 'dueTomorrow':
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1)
                const tomorrowTasks = tasks.filter(task => new Date(task.dueDate).toDateString() === tomorrow.toDateString()).length;
                setTasks(tomorrowTasks);
                break;
        }
    }

    return (
        <div>
            <div className="flex-row">
                <div>
                    <NavLink to="add">
                        <button className="text-cap primary-button">new task</button>
                    </NavLink>
                </div>
                <div className="filter-wrapper text-cap">
                    <label className="filter-label">filter</label>
                    <select className="text-cap" onChange={event => filterTasks(event)}>
                        <option value="all">all tasks</option>
                        <option value="new">new tasks</option>
                        <option value="high">high priority tasks</option>
                        <option value="low">low priority tasks</option>
                        <option value="dueToday">due today</option>
                        <option value="dueTomorrow">due tomorrow</option>
                    </select>
                </div>
            </div>
            <div>
                {tasks.map(task => <div className="project-detail-container" key={task.id}>
                    <div>
                        <button className="project-detail-button text-cap"
                                onClick={() => onSelectTask(task.id)}>
                            {task.title}
                        </button>
                    </div>
                    <div className="task-details flex-row text-cap">
                        <div className="task-option">due: {task.dueDate}</div>
                        <div className="task-option">priority : {task.priority}</div>
                        <div className="task-option">status : {task.status}</div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}