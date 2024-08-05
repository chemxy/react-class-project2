import {useEffect, useState} from "react";
import {ProjectContext} from "../store/ProjectContext";
import '../App.css';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

export default function IndexPage() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3200/tasks').then(res => {
            if (!res.ok) {
                throw new Error("could not get projects from backend");
            }
            return res.json();
        }).then(resData => {
            console.log(resData)
            setProjects(resData.tasks);
        })
    }, []);

    function addProject(project) {

        fetch('http://localhost:3200/project', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("could not add projects to backend");
            } else {
                return res.json();

            }
        }).then(data => {
            console.log(`added project - id: ${project.id}`);
            setProjects((prevProjects) => [...prevProjects, data.project]);
            navigate('/');
        }).catch(error => {
            console.log(error);
            throw new Error("could not add projects to backend");
        })
    }

    function deleteProject(id) {
        // console.log("deleting id:" + id);

        // console.log(newProjects)
        console.log("deleting")
        const data = {
            id: id
        }
        console.log(data)
        fetch("http://localhost:3200/deleteproject", {
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
            const newProjects = projects.filter((project) => project.id !== id);
            setProjects(newProjects);
            navigate('/');
        }).catch(error => {
            console.log(error)
        })

    }

    const ProjectCtx = {
        items: projects,
        addItem: addProject,
        deleteItem: deleteProject,
    }

    return (
        <ProjectContext.Provider value={ProjectCtx}>
            <div className="App">
                <div className="app-wrapper flex-row">
                    <div className="left">
                        <NavBar></NavBar>
                    </div>
                    <div className="right">
                        <Outlet></Outlet>
                    </div>
                </div>


            </div>
        </ProjectContext.Provider>
    );
}
