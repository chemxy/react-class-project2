import '../App.css';
import DashboardSmallCell from "./DashboardSmallCell";
import DashboardLargeCell from "./DashboardLargeCell";
import {useEffect, useState} from "react";

export default function Dashboard() {

    const [dashboardStats, setDashboardStats] = useState({
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
                newTasks: resData.new,
                inProgressTasks: resData.inProgress,
                doneTasks: resData.done,
                tasksDueToday: resData.dueToday,
                taskDueTomorrow: resData.dueTomorrow
            });
        })
    }, []);


    return (
        <div>
            <div className="flex-row dashboard-wrapper">
                <DashboardSmallCell value={dashboardStats.newTasks} title={"new task"}></DashboardSmallCell>
                <DashboardSmallCell value={dashboardStats.inProgressTasks} title={"in progress"}></DashboardSmallCell>
                <DashboardSmallCell value={dashboardStats.doneTasks} title={"task done"}></DashboardSmallCell>
            </div>
            <div className="flex-row dashboard-wrapper">
                <DashboardLargeCell value={dashboardStats.tasksDueToday} title={"tasks due today"}></DashboardLargeCell>
                <DashboardLargeCell value={dashboardStats.taskDueTomorrow}
                                    title={"tasks due tomorrow"}></DashboardLargeCell>
            </div>
        </div>

    );
}