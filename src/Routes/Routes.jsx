import {
    createBrowserRouter,
} from "react-router-dom";
import Monitor from "../Dashboard/Admin/Monitor";
import UserManagement from "../Dashboard/Admin/UserManagement";
import Dashboard from "../Dashboard/Dashboard";
import Main from "../Dashboard/Main";
import Login from "../Login/Login";
import RegistrationForm from "../Registration/RegistrationForm";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: 'reg',
                element: <RegistrationForm></RegistrationForm>
            },
            {
                path: 'login',
                element: <Login></Login>
            }
            ,
            {
                path: 'dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: 'user-management',
                        element: <UserManagement></UserManagement>
                    },
                    {
                        path: 'system-monitoring',
                        element: <Monitor></Monitor>
                    }
                ]
            },

        ]
    },
]);