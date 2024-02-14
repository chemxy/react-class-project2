import '../App.css';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function ProjectDetail() {
    const projectContext = useContext(ProjectContext);
    // const [project, setProject] = useState(undefined);
    const params = useParams();
    const projectId = params.projectId;
    const project = projectContext.items.find((project) => project.id === projectId)

    // useEffect(() => {
    //     console.log("getting project id: " + projectId)
    //     fetch('http://localhost:3200/projects/' + projectId).then(res => {
    //         if (!res.ok) {
    //             throw new Error("could not get projects from backend");
    //         }
    //         return res.json();
    //     }).then(resData => {
    //         console.log(resData);
    //         const selectedProject = resData.project;
    //         setProject(selectedProject)
    //     })
    // }, []);

    function handleDelete() {
        // projectContext.deleteItem(projectId);
        console.log("deleting")
        const data = {
            id: "dsff32f2f32"
        }
        console.log(data)
        fetch("http://localhost:3200/deleteproject", {
                method: "POST",
                body: JSON.stringify(data)
            }
        ).then(res => {
            console.log(res)
            if (res.ok) {
                console.log("project deleted.")
                return res.json();
            }

        }).then(data => {
            console.log(data);
        }).catch(error=>{
            console.log(error)
        })
    }

    if (project) {
        return (
            <div>
                <h1>{project.name}</h1>
                <h3>{project.dueDate}</h3>
                <p>{project.description}</p>
                <button className="secondary-button" onClick={handleDelete}>delete</button>
            </div>
        );
    } else {
        return <div>loading</div>
    }

}