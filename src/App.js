import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexPage from "./components/IndexPage";
import ProjectDetail from "./components/ProjectDetail";
import AddTask from "./components/AddTask";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";

const router = createBrowserRouter([
    {
        path: '',
        element: <IndexPage/>,
        children: [
            {path: '', element: <Dashboard/>},
            {path: 'dashboard', element: <Dashboard/>},
            {path: 'tasks', element: <TaskList/>},
            {path: 'tasks/:taskId', element: <ProjectDetail/>},
            {path: 'tasks/add', element: <AddTask/>},
        ]
    },
])


function App() {
    return <RouterProvider router={router}/>;
}

export default App;
