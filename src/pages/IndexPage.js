import { useState } from "react";
import { ProjectContext } from "../store/ProjectContext";
import ProjectList from "../components/ProjectList";
import '../App.css';
import { NavLink, Outlet } from "react-router-dom";

export default function IndexPage() {

    const [projects, setProjects] = useState([{
        id: 'fds12213',
        name: 'sample1',
        dueDate: '121',
        description: 'sadsadsadsadsa'
    }, {
        id: 'fds12214',
        name: 'sample2',
        dueDate: '1211',
        description: 'sadsadsadsadsa'
    }
    ]);

    function addProject(project) {
        setProjects((prevProjects) => [...prevProjects, project]);
    }

    const ProjectCtx = {
        items: projects,
        addItem: addProject,
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
