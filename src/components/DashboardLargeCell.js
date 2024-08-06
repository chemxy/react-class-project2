import '../App.css';

export default function DashboardLargeCell(props) {
    return (
        <div className="dashboard-cell dashboard-large-cell">
            <div className="dashboard-cell-stats">{props.value}</div>
            <div className="dashboard-cell-stats-title">{props.title}</div>
        </div>

    );
}