import '../App.css';
import {useContext} from "react";
import {ProjectContext} from "../store/ProjectContext";
import {useNavigate} from "react-router-dom";

export default function TaskList() {

    const projects = useContext(ProjectContext)
    const navigate = useNavigate();

    function onSelectTask(id) {
        navigate(`${id}`);
    }

    function createTask(id) {
        console.log("add task")
        navigate(`add`);
    }

    return (
        <div>
            <div>
                <button className="text-cap" onClick={createTask}>new task</button>
            </div>
            <div>
                {projects.items.map(task => <div className="project-detail-container" key={task.id}>
                    <button className="project-detail-button"
                            onClick={() => onSelectTask(task.id)}>
                        {task.title}
                    </button>
                </div>)}
            </div>

        </div>
    );
}