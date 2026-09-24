import { createContext, useContext, useEffect, useState } from "react";

import api from "../services/api";
import { getToken, removeToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const token = getToken();

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await api.get("/auth/profile");

            setUser(response.data.user);
        } catch (error) {
            removeToken();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                refreshProfile: fetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);