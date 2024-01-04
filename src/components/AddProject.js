import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function AddProject() {

    const projectContext = useContext(ProjectContext);

    function onAddProject(event) {         //TODO handle empty / invalid input
        event.preventDefault();
        const fd = new FormData(event.target);
        const newProject = Object.fromEntries(fd.entries());
        newProject.id = Math.random().toString(36).replace('.', '');
        // console.log(`add project - id: ${newProjectId}`)
        projectContext.addItem(newProject); //sync with project context
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
