import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Dashboard from "../components/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";




const route = createBrowserRouter([
    {
        path: '/',
        element:  <App></App>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
           
        ]
    }
])

export default route;