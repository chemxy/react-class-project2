import '../App.css';

export default function DashboardSmallCell(props) {
    return (
        <div className="dashboard-cell dashboard-small-cell">
            <div className="dashboard-cell-stats">{props.value}</div>
            <div className="dashboard-cell-stats-title">{props.title}</div>
        </div>

    );
}