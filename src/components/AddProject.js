import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";
import { json, useNavigate } from "react-router-dom";

export default function AddProject() {

    // const projectContext = useContext(ProjectContext);
    const navigate = useNavigate();

    function onAddProject(event) {         //TODO handle empty / invalid input
        event.preventDefault();
        const fd = new FormData(event.target);
        const newProject = Object.fromEntries(fd.entries());
        const newProjectId = Math.random().toString(36).replace('.', '');
        newProject.id = newProjectId;
        // console.log(`add project - id: ${newProjectId}`)
        // projectContext.addItem(newProject); //TODO commented out - this uses react context api

        fetch('http://localhost:3200/project', {
            method: 'POST',
            body: JSON.stringify(newProject),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error("could not add projects to backend");
            } else {
                console.log(`added project - id: ${newProjectId}`);
                navigate('/');
            }
        }).catch(error => {
            console.log(error);
            throw new Error("could not add projects to backend");
        })

    }

    return <div>
        <form onSubmit={onAddProject}>
            <h1 className="text-cap">create a project</h1>
            <div className="input-group">
                <div>
                    <label className="input-label">name</label>
                </div>
                <div>
                    <input type="text" name="name" className="input-text"/>
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label className="input-label">due date</label>
                </div>
                <div>
                    <input type="text" name="dueDate" className="input-text"/>
                </div>
            </div>

            <div className="input-group">
                <div>
                    <label className="input-label">description</label>
                </div>
                <div>
                    <textarea type="text" name="description" className="input-text" id="input-description"/>
                </div>
            </div>
            <button type="submit" className="secondary-button text-cap">add</button>
            <button type="submit" className="primary-button text-cap">cancel</button>
        </form>
    </div>
}
