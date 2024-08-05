import '../App.css';
import {NavLink} from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar-wrapper">
            <ul className="navbar-options">
                <li>
                    {/*TODO: add icons*/}
                    <NavLink to="dashboard">
                        <span className="text-cap">dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="task/list">
                        <span className="text-cap">tasks</span>
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