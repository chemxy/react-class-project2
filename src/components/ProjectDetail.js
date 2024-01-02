import '../App.css';
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function ProjectDetail() {

    const projectContext = useContext(ProjectContext);
    const params = useParams();
    const projectId = params.projectId;
    const project = projectContext.items.find((project) => project.id === projectId)

    return (
        <div>
            <h1>{project.name}</h1>
            <h1>{project.dueDate}</h1>
            <p>{project.description}</p>
        </div>
    );
}