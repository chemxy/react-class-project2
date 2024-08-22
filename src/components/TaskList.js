import '../App.css';
import {useContext} from "react";
import {ProjectContext} from "../store/ProjectContext";
import {NavLink, useNavigate} from "react-router-dom";

export default function TaskList() {

    const projects = useContext(ProjectContext)
    const navigate = useNavigate();

    function onSelectTask(id) {
        navigate(`${id}`);
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
                    <select className="text-cap">
                        <option value="">all tasks</option>
                        <option value="">new tasks</option>
                        <option value="">due today</option>
                        <option value="">due tomorrow</option>
                    </select>
                </div>
            </div>
            <div>
                {projects.items.map(task => <div className="project-detail-container" key={task.id}>
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