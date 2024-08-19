import '../App.css';
import {NavLink} from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar-wrapper">
            <div className="app-title">
                <h3>Taskboard</h3>
            </div>
            <ul className="navbar-options">
                <li className="navbar-option">
                    {/*TODO: add icons*/}
                    <NavLink to="dashboard">
                        <span className="text-cap">my dashboard</span>
                    </NavLink>
                </li>
                <li className="navbar-option">
                    <NavLink to="tasks">
                        <span className="text-cap">my tasks</span>
                    </NavLink>
                </li>
                {/*<li>*/}
                {/*    <NavLink to="project/add">*/}
                {/*        <span className="text-cap">dashboard</span>*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <NavLink to="project/add">*/}
                {/*        <span className="text-cap">dashboard</span>*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <NavLink to="project/add">*/}
                {/*        <span className="text-cap">dashboard</span>*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
            </ul>

        </div>
    );
}