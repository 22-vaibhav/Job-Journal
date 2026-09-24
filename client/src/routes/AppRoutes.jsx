import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import JourneyPage from "../pages/journey/JourneyPage";
import JournalPage from "../pages/journal/JournalPage";
import ProfilePage from "../pages/profile/ProfilePage";
import SearchPage from "../pages/search/SearchPage";
import InsightsPage from "../pages/insights/InsightsPage";
import SettingsPage from "../pages/settings/SettingsPage";

import ProtectedRoute from "./ProtectRoutes";
import { ROUTES } from "../constants/routes";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route
                    path={ROUTES.LOGIN}
                    element={<LoginPage />}
                />

                <Route
                    path={ROUTES.REGISTER}
                    element={<RegisterPage />}
                />

                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path={ROUTES.JOURNEY}
                        element={<JourneyPage />}
                    />

                    <Route
                        path={ROUTES.JOURNAL}
                        element={<JournalPage />}
                    />

                    <Route
                        path={ROUTES.PROFILE}
                        element={<ProfilePage />}
                    />

                    <Route
                        path={ROUTES.SETTINGS}
                        element={<SettingsPage />}
                    />

                    <Route
                        path={ROUTES.SEARCH}
                        element={<SearchPage />}
                    />

                    <Route
                        path={ROUTES.INSIGHTS}
                        element={
                            <ProtectedRoute>
                                <InsightsPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* Fallback */}
                <Route
                    path="*"
                    element={<LoginPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;