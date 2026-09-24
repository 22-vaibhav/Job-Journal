import api from "./api";

const API_URL = "/settings";

export const getProfile = async () => {
    const response = await api.get(`${API_URL}/profile`);
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get(`${API_URL}/notifications`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put(
        `${API_URL}/profile`,
        profileData
    );

    return response.data;
};

export const updateNotifications = async (notifications) => {
    const response = await api.put(
        `${API_URL}/notifications`,
        notifications
    );

    return response.data;
};

export const changePassword = async (passwordData) => {
    const response = await api.put(
        "/settings/change-password",
        passwordData
    );

    return response.data;
};