import '../App.css';
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function ProjectDetail() {

    const nav = useNavigate();
    const projectContext = useContext(ProjectContext);
    const params = useParams();
    const projectId = params.projectId;
    const project = projectContext.items.find((project) => project.id === projectId)

    function handleDelete(){
        projectContext.deleteItem(projectId);
    }

    return (
        <div>
            <h1>{project.name}</h1>
            <h3>{project.dueDate}</h3>
            <p>{project.description}</p>
            <button className="secondary-button" onClick={handleDelete}>delete</button>
        </div>
    );
}