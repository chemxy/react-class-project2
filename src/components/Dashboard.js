import '../App.css';
import DashboardSmallCell from "./DashboardSmallCell";
import DashboardLargeCell from "./DashboardLargeCell";

export default function Dashboard() {
    return (
        <div>
            <div className="flex-row dashboard-wrapper">
                <DashboardSmallCell value={14} title={"new task"}></DashboardSmallCell>
                <DashboardSmallCell value={3} title={"in progress"}></DashboardSmallCell>
                <DashboardSmallCell value={5} title={"task done"}></DashboardSmallCell>
            </div>
            <div className="flex-row dashboard-wrapper">
                <DashboardLargeCell value={14} title={"tasks due today"}></DashboardLargeCell>
                <DashboardLargeCell value={14} title={"tasks due tomorrow"}></DashboardLargeCell>
            </div>
        </div>

    );
}