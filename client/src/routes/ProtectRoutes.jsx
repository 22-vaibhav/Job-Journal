import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

import { ROUTES } from "../constants/routes";

const ProtectedRoute = ({ children }) => {

    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;