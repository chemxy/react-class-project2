import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ProjectDetail from "./components/ProjectDetail";

const router = createBrowserRouter([
    {path: '', element: <IndexPage/>},
])


function App() {
    return <RouterProvider router={router}/>;
}

export default App;
