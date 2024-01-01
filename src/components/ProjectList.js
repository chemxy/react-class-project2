import '../App.css';
import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";
import { NavLink } from "react-router-dom";

export default function ProjectList({selectProject}) {

    const projects = useContext(ProjectContext)

    function onSelectProject(id) {
        // console.log(id);
        selectProject(id);
    }

    return (
        <div>
            {projects.map(project => <div className="project-detail-container">
                <button className="project-detail-button"
                        onClick={() => onSelectProject(project.id)}>{project.name}</button>
            </div>)}
        </div>
    );
}