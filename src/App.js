import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from "./components/IndexPage";
import ProjectDetail from "./components/ProjectDetail";
import AddProject from "./components/AddProject";
import Dashboard from "./components/Dashboard";
import ProjectList from "./components/ProjectList";

const router = createBrowserRouter([
    {
        path: '',
        element: <IndexPage/>,
        children: [
            {path: '', element: <Dashboard/>},
            {path: 'dashboard', element: <Dashboard/>},
            {path: 'task/list', element: <ProjectList/>},
            {path: 'task/:projectId', element: <ProjectDetail/>},
            {path: 'task/add', element: <AddProject/>},
        ]
    },
])


function App() {
    return <RouterProvider router={router}/>;
}

export default App;
