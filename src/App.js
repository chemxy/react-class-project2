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
            {path: 'tasks', element: <ProjectList/>},
            {path: 'tasks/:taskId', element: <ProjectDetail/>},
            {path: 'tasks/add', element: <AddProject/>},
        ]
    },
])


function App() {
    return <RouterProvider router={router}/>;
}

export default App;
