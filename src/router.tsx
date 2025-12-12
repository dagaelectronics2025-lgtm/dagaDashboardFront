import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "@/modules/sign-in/views/SignIn.tsx";
import {LayoutDashboard} from "@/layouts/layout-dashboard/views/LayoutDashboard.tsx";
import {Dashboard} from "@/modules/dashboard/views/Dashboard.tsx";
import {Users} from "@/modules/users/views/Users.tsx";
import {Products} from "@/modules/products/views/Products.tsx";
import {Stores} from "@/modules/stores/views/Stores.tsx";
import {useAuthStore} from "@/shared/stores/authStore.ts";
import type {ReactElement} from "react";

const ProtectedRoute = ({children}: { children: ReactElement }) => {
    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return children;
};

export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute>
                    <LayoutDashboard>
                        <Dashboard/>
                    </LayoutDashboard>
                </ProtectedRoute>
            }
        />
        <Route
            path="/users"
            element={
                <ProtectedRoute>
                    <LayoutDashboard>
                        <Users/>
                    </LayoutDashboard>
                </ProtectedRoute>
            }
        />
        <Route
            path="/stores"
            element={
                <ProtectedRoute>
                    <LayoutDashboard>
                        <Stores/>
                    </LayoutDashboard>
                </ProtectedRoute>
            }
        />
        <Route
            path="/products"
            element={
                <ProtectedRoute>
                    <LayoutDashboard>
                        <Products/>
                    </LayoutDashboard>
                </ProtectedRoute>
            }
        />
    </Routes>
);
