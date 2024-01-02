import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function AddProject() {

    const projectContext = useContext(ProjectContext);

    function onAddProject(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData)
        const newProject = {
            id: 'ufas11'
        }
    }

    //TODo add project function
    return <div>
        <form onSubmit={onAddProject}>
            <input type="text" name="name"/>
            <input type="text" name="dueDate"/>
            <input type="text" name="description"/>
            <button type="submit">add</button>
        </form>
    </div>
}
