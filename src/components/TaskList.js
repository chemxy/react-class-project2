import '../App.css';
import {useContext, useEffect, useState} from "react";
import {ProjectContext} from "../store/ProjectContext";
import {NavLink, useNavigate} from "react-router-dom";

export default function TaskList() {

    const projectContext = useContext(ProjectContext)
    const navigate = useNavigate();

    const [projects, setProjects] = useState([])

    useEffect(() => {
        console.log(projectContext.items)
        setProjects(projectContext.items);
    }, []);

    function onSelectTask(id) {
        navigate(`${id}`);
    }

    function filterTasks(event) {
        console.log("filter tasks: " + event.target.value)
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