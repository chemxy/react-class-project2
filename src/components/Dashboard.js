import '../App.css';
import DashboardSmallCell from "./DashboardSmallCell";
import {useContext, useEffect, useState} from "react";
import ProgessBar from "./ProgressBar";
import {TaskContext} from "../store/TaskContext";

export default function Dashboard() {

    const taskContext = useContext(TaskContext);
    const [dashboardStats, setDashboardStats] = useState({
        allTasks: 0,
        newTasks: 0,
        inProgressTasks: 0,
        doneTasks: 0,
        tasksDueToday: 0,
        taskDueTomorrow: 0
    })


    useEffect(() => {

        let newTasks = taskContext.items.filter(task => task.status === "new").length;
        let inProgressTasks = taskContext.items.filter(task => task.status === "in progress").length;
        let doneTasks = taskContext.items.filter(task => task.status === "done").length;
        let taskDueToday = taskContext.items.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)
        let taskDueTomorrow = taskContext.items.filter(task => new Date(task.dueDate).toDateString() === tomorrow.toDateString()).length;

        setDashboardStats({
            ...dashboardStats,
            allTasks: taskContext.items.length,
            newTasks: newTasks,
            inProgressTasks: inProgressTasks,
            doneTasks: doneTasks,
            tasksDueToday: taskDueToday,
            taskDueTomorrow: taskDueTomorrow
        });
    }, []);


    return (
        <div>
            <div className="dashboard-wrapper">
                <ProgessBar allTasks={dashboardStats.allTasks} newTasks={dashboardStats.newTasks}></ProgessBar>
            </div>
            <div className="dashboard-wrapper">
                <DashboardSmallCell value={dashboardStats.newTasks} title={"new task"}></DashboardSmallCell>
                <DashboardSmallCell value={dashboardStats.inProgressTasks}
                                    title={"in progress"}></DashboardSmallCell>
                <DashboardSmallCell value={dashboardStats.doneTasks} title={"task done"}></DashboardSmallCell>
                <DashboardSmallCell value={dashboardStats.tasksDueToday}
                                    title={"tasks due today"}></DashboardSmallCell>
                <DashboardSmallCell value={dashboardStats.taskDueTomorrow}
                                    title={"tasks due tomorrow"}></DashboardSmallCell>
            </div>
        </div>

    );
}