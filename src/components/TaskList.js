import '../App.css';
import {useEffect, useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

export default function TaskList() {

    const navigate = useNavigate();
    const allTasks = useRef([]);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch('http://localhost:3200/tasks/all').then(res => {
            if (!res.ok) {
                throw new Error("could not get tasks from backend");
            }
            console.log(res)
            return res.json();
        }).then(resData => {
            console.log(resData)
            setTasks(resData.tasks);
            allTasks.current = resData.tasks;
        })
    }, []);

    function onSelectTask(id) {
        navigate(`${id}`);
    }

    function filterTasks(event) {
        console.log("filter tasks: " + event.target.value)
        const filterValue = event.target.value;
        switch (filterValue) {
            case 'all':
                setTasks(allTasks.current);
                break;
            case 'new':
                const newProjects = allTasks.current.filter(project => project.status === 'new');
                setTasks(newProjects);
                break;
                break;
            case 'in progress':
                const inProgressProjects = allTasks.current.filter(project => project.status === 'in progress');
                setTasks(inProgressProjects);
                break;
            case 'done':
                const completedProjects = allTasks.current.filter(project => project.status === 'done');
                setTasks(completedProjects);
                break;
            case 'high':
                const highPriorityProjects = allTasks.current.filter(project => project.priority === 'high');
                setTasks(highPriorityProjects);
                break;
            case 'low':
                const lowPriorityProjects = allTasks.current.filter(project => project.priority === 'low');
                setTasks(lowPriorityProjects);
                break;
            case 'dueToday':
                const todayTasks = allTasks.current.filter(task => new Date(task.dueDate + "GMT-07:00").toDateString() === new Date().toDateString());
                setTasks(todayTasks);
                break;
            case 'dueTomorrow':
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1)
                const tomorrowTasks = allTasks.current.filter(task => new Date(task.dueDate + "GMT-07:00").toDateString() === tomorrow.toDateString());
                setTasks(tomorrowTasks);
                break;
        }
    }

    return (
        <div>
            <div className="flex-row">
                <div>
                    <NavLink to="add">
                        <button className="text-cap primary-button">new task</button>
                    </NavLink>
                </div>
                <div className="filter-wrapper text-cap">
                    <label className="filter-label">filter</label>
                    <select className="text-cap" onChange={event => filterTasks(event)}>
                        <option value="all">all tasks</option>
                        <option value="new">new tasks</option>
                        <option value="in progress">in progress tasks</option>
                        <option value="done">completed tasks</option>
                        <option value="high">high priority tasks</option>
                        <option value="low">low priority tasks</option>
                        <option value="dueToday">due today</option>
                        <option value="dueTomorrow">due tomorrow</option>
                    </select>
                </div>
            </div>
            <div id="project-list-container">
                {tasks.length === 0 && <div className="text-cap no-tasks">no tasks found</div>}
                {tasks.map(task => <div className="project-detail-container" key={task.id}>
                    <div>
                        <button className="project-detail-button text-cap"
                                onClick={() => onSelectTask(task.id)}>
                            {task.title}
                        </button>
                    </div>
                    <div className="task-details flex-row text-cap">
                        <div className="task-option">due: {task.dueDate}</div>
                        <div className="task-option">priority : {task.priority}</div>
                        <div className="task-option">status : {task.status}</div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}