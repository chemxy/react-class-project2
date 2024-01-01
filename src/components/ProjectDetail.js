import '../App.css';
import img from "../assets/no-projects.png";
import { useParams } from "react-router-dom";

export default function ProjectDetail({project}) {

    if (project == undefined) {
        return <div>
            <img src={img} alt="no projects"/>
        </div>
    } else {
        return (
            <div>
                <h1>{project.name}</h1>
                <h1>{project.dueDate}</h1>
                <p>{project.description}</p>
            </div>
        );
    }
}