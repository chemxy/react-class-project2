import '../App.css';
import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../store/TaskContext";
import {NavLink, useNavigate} from "react-router-dom";

export default function TaskList() {

    const taskContext = useContext(TaskContext)
    const navigate = useNavigate();

    const [projects, setProjects] = useState([])

    useEffect(() => {
        console.log(taskContext.items)
        setProjects(taskContext.items);
    }, []);

    function onSelectTask(id) {
        navigate(`${id}`);
    }

    function filterTasks(event) {
        console.log("filter tasks: " + event.target.value)
        const filterValue = event.target.value;
        switch (filterValue) {
            case 'all':
                setProjects(taskContext.items);
                break;
            case 'new':
                const newProjects = taskContext.items.filter(project => project.status === 'NEW');
                setProjects(newProjects);
                break;
            case 'high':
                const highPriorityProjects = taskContext.items.filter(project => project.priority === 'HIGH');
                setProjects(highPriorityProjects);
                break;
            case 'low':
                const lowPriorityProjects = taskContext.items.filter(project => project.priority === 'LOW');
                setProjects(lowPriorityProjects);
                break;
            case 'dueToday':
                taskContext.items.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1)
                let taskDueTomorrow = tasks.filter(task => new Date(task.dueDate).toDateString() === tomorrow.toDateString()).length;
                break;
            case 'dueTomorrow':
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
                {projects.map(task => <div className="project-detail-container" key={task.id}>
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