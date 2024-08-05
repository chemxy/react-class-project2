import '../App.css';
import {useContext, useEffect} from "react";
import { ProjectContext } from "../store/ProjectContext";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {

    const projects = useContext(ProjectContext)
    const navigate = useNavigate();

    function onSelectProject(id) {
        navigate(`task/${id}`);
    }

    return (
        <div>
            {projects.items.map(task => <div className="project-detail-container" key={task.id}>
                <button className="project-detail-button"
                        onClick={() => onSelectProject(task.id)}>{task.title}</button>
            </div>)}
        </div>
    );
}