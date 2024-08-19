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
            <div>
                <NavLink to="add">
                    <button className="text-cap primary-button">new task</button>
                </NavLink>

            </div>
            <div>
                {projects.items.map(task => <div className="project-detail-container" key={task.id}>
                    <div>
                        <button className="project-detail-button text-cap"
                                onClick={() => onSelectTask(task.id)}>
                            {task.title}
                        </button>
                    </div>
                    <div className="flex-row text-cap">
                        <div>due: {task.dueDate}</div>
                        <div>priority : {task.priority}</div>
                        <div>status : {task.status}</div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}