import {useContext} from "react";
import {TaskContext} from "../store/TaskContext";
import {NavLink, useNavigate} from "react-router-dom";
import {v4 as uuid} from "uuid";

export default function AddTask() {

    const taskContext = useContext(TaskContext);
    const navigate = useNavigate();

    function onAddTask(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const newTask = Object.fromEntries(fd.entries());

        //add meta data
        newTask.id = uuid();
        newTask.status = "new";
        newTask.createdDate = new Date().toISOString().split('T')[0]; // get today's date
        console.log(newTask)
        taskContext.addItem(newTask); //sync with project context and add task to backend
        navigate("/")
    }

    return <div>
        <form onSubmit={onAddTask}>
            <h1 className="text-cap">create a task</h1>
            <div className="input-group">
                <div>
                    <label className="input-label">title</label>
                </div>
                <div>
                    <input type="text" name="title" className="input-text" required/>
                </div>
            </div>

            <div className="input-group flex-row">
                <div className="width-50">
                    <div>
                        <label className="input-label">due date</label>
                    </div>
                    <div>
                        <input type="date" name="dueDate" className="input-text" required/>
                    </div>
                </div>
                <div className="width-50" id="input-priority">
                    <div>
                        <label className="input-label">priority</label>
                    </div>
                    <div>
                        <select name="priority" className="input-text text-cap">
                            <option value="low">low</option>
                            <option value="high">high</option>
                        </select>
                    </div>
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
            <button type="submit" className="primary-button text-cap" id="add-task-button">add</button>
            <NavLink to="/tasks">
                <button type="button" className="primary-button text-cap">cancel</button>
            </NavLink>

        </form>
    </div>
}
