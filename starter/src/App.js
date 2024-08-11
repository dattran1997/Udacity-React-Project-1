import { routes } from "./router"
import { useRoutes } from "react-router-dom";
import './App.css';

export default function App() {
    const routeRender = useRoutes(routes);

    return (
        <div className="app">
            {routeRender}
        </div>
    )
}