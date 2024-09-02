import '../App.css';
import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";

export default function IndexPage() {

    return (
        <div className="App">
            <div className="app-wrapper flex-row">
                <div className="left">
                    <NavBar></NavBar>
                </div>
                <div className="right">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
