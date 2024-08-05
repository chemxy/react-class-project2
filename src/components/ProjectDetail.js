import '../App.css';
import {useNavigate, useParams} from "react-router-dom";
import {useContext} from "react";
import {ProjectContext} from "../store/ProjectContext";

export default function ProjectDetail() {
    const projectContext = useContext(ProjectContext);
    const navigate = useNavigate();
    const params = useParams();
    const taskId = params.taskId;
    const task = projectContext.items.find((task) => task.id === taskId)

    function handleDelete() {
        projectContext.deleteItem(taskId);
        console.log("deleting")
        const data = {
            id: taskId
        }
        console.log(data)
        fetch("http://localhost:3200/deletetask", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            console.log(res)
            if (res.ok) {
                console.log("project deleted.")
                return res.json();
            }

        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error)
        })
    }

    if (task) {
        return (
            <div>
                <h1>{task.title}</h1>
                <h3>{task.dueDate}</h3>
                <p>{task.description}</p>
                <button className="secondary-button" onClick={handleDelete}>delete</button>
            </div>
        );
    } else {
        navigate('/');
    }

}