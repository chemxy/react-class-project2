import '../App.css';
import DashboardSmallCell from "./DashboardSmallCell";
import DashboardLargeCell from "./DashboardLargeCell";
import {useEffect, useState} from "react";

export default function Dashboard() {

    const [dashboardStats, setDashboardStats] = useState({
        allTasks: 0,
        newTasks: 0,
        inProgressTasks: 0,
        doneTasks: 0,
        tasksDueToday: 0,
        taskDueTomorrow: 0
    })

    const [circle, setCircle] = useState({
        diameter: 200
    })

    useEffect(() => {
        fetch('http://localhost:3200/tasks/count').then(res => {
            return res.json();
        }).then(resData => {
            // console.log(resData)
            setDashboardStats({
                ...dashboardStats,
                // allTasks: resData.all,
                allTasks: 4,
                // newTasks: resData.new,
                newTasks: 2,
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
                <div>
                    <svg width={circle.diameter * 2} height={circle.diameter * 2}>
                        <circle cx={circle.diameter} cy={circle.diameter} r={circle.diameter / 2} fill="none"
                                stroke="lightgrey"
                                strokeWidth={circle.diameter / 5}/>
                        <circle cx={circle.diameter} cy={circle.diameter} r={circle.diameter / 2} fill="none"
                                stroke="green"
                                strokeWidth={circle.diameter / 5}
                                strokeDasharray={`${dashboardStats.newTasks / dashboardStats.allTasks * 618},99999`} strokeLinecap={"round"}
                                transform={`rotate(-90, ${circle.diameter}, ${circle.diameter})`}/>
                        <text x={circle.diameter * 0.905}
                              y={circle.diameter * 1.05}>{dashboardStats.newTasks / dashboardStats.allTasks * 100} %
                        </text>
                    </svg>
                </div>
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