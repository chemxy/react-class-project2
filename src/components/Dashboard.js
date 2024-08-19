import '../App.css';
import DashboardSmallCell from "./DashboardSmallCell";
import DashboardLargeCell from "./DashboardLargeCell";
import {useEffect, useState} from "react";
import ProgessBar from "./ProgressBar";

export default function Dashboard() {

    const [dashboardStats, setDashboardStats] = useState({
        allTasks: 0,
        newTasks: 0,
        inProgressTasks: 0,
        doneTasks: 0,
        tasksDueToday: 0,
        taskDueTomorrow: 0
    })


    useEffect(() => {
        fetch('http://localhost:3200/tasks/count').then(res => {
            return res.json();
        }).then(resData => {
            // console.log(resData)
            setDashboardStats({
                ...dashboardStats,
                allTasks: 2,
                newTasks: 1,
                inProgressTasks: resData.inProgress,
                doneTasks: resData.done,
                tasksDueToday: resData.dueToday,
                taskDueTomorrow: resData.dueTomorrow
            });
        })
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