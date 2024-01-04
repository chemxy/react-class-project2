import { useEffect, useState } from "react";
import { ProjectContext } from "../store/ProjectContext";
import ProjectList from "../components/ProjectList";
import '../App.css';
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function IndexPage() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3200/projects').then(res => {
            if (!res.ok) {
                throw new Error("could not get projects from backend");
            }
            return res.json();
        }).then(resData => {
            setProjects(resData.projects);
        })
    }, []);

    function addProject(project) {
        setProjects((prevProjects) => [...prevProjects, project]);
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
                console.log(`added project - id: ${project.id}`);
                navigate('/');
            }
        }).catch(error => {
            console.log(error);
            throw new Error("could not add projects to backend");
        })
    }

    function deleteProject(id) {
        console.log("deleting id:" + id);
        const newProjects = projects.filter((project) => project.id !== id);
        console.log(newProjects)
        // setProjects(newProjects);
    }

    const ProjectCtx = {
        items: projects,
        addItem: addProject,
        deleteItem: deleteProject,
    }

    return (
        <ProjectContext.Provider value={ProjectCtx}>
            <div className="App flex-row">
                <div className="left">
                    <div id="project-list-section">
                        <div>
                            <h1 className="text-upper">your projects</h1>
                        </div>
                        <div>
                            <NavLink to="project/add">
                                <button className="primary-button text-cap">+ add project</button>
                            </NavLink>
                        </div>
                        <div id="project-list-container" className="text-cap">
                            <ProjectList></ProjectList>
                        </div>
                    </div>

                </div>
                <div className="right">
                    <div id="project-detail-container">
                        <Outlet></Outlet>
                    </div>

                </div>
            </div>
        </ProjectContext.Provider>
    );
}
