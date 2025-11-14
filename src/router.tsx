import {Route, Routes} from "react-router-dom";
import SignIn from "@/modules/sign-in/views/SignIn.tsx";
import {LayoutDashboard} from "@/layouts/layout-dashboard/views/LayoutDashboard.tsx";
import {Dashboard} from "@/modules/dashboard/views/Dashboard.tsx";
import {Users} from "@/modules/users/views/Users.tsx";

export const AppRouter = () => (<Routes>
    <Route path="/" element={<SignIn/>}/>
    <Route path="/dashboard" element={
        <LayoutDashboard>
            <Dashboard/>
        </LayoutDashboard>
    }/>
    <Route path="/users" element={
        <LayoutDashboard>
            <Users/>
        </LayoutDashboard>
    }/>
</Routes>)