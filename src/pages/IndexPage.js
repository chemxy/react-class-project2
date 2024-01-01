import { useState } from "react";
import { ProjectContext } from "../store/ProjectContext";
import ProjectList from "../components/ProjectList";
import ProjectDetail from "../components/ProjectDetail";
import '../App.css';

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
    const [activeProject, setActiveProject] = useState(undefined);

    function selectProject(id) {
        console.log("set active project id: " + id)
        const selectedProject = projects.find((project) => id === project.id)
        setActiveProject(selectedProject);
    }

    return (
        <ProjectContext.Provider value={projects}>
            <div className="App flex-row">
                <div className="left">
                    <div id="project-list-section">
                        <div>
                            <h1 className="text-upper">your projects</h1>
                        </div>
                        <div>
                            <button className="primary-button text-cap">+ add project</button>
                        </div>
                        <div id="project-list-container" className="text-cap">
                            <ProjectList selectProject={selectProject}></ProjectList>
                        </div>
                    </div>

                </div>
                <div className="right">
                    <div id="project-detail-container">
                        <ProjectDetail project={activeProject}></ProjectDetail>
                    </div>

                </div>
            </div>
        </ProjectContext.Provider>
    );
}
