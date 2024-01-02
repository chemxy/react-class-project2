import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ProjectDetail from "./components/ProjectDetail";
import AddProject from "./components/AddProject";
import img from "./assets/no-projects.png";

const router = createBrowserRouter([
    {
        path: '',
        element: <IndexPage/>,
        children: [
            {path: '', element: <div><img src={img} alt="no projects"/></div>},
            {path: 'project/:projectId', element: <ProjectDetail/>},
            {path: 'project/add', element: <AddProject/>},
        ]
    },
])


function App() {
    return <RouterProvider router={router}/>;
}

export default App;
