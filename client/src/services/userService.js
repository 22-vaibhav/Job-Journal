import api from "./api";

export const getProfile = async () => {
    const response = await api.get("/users/profile");
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put(
        "/users/profile",
        profileData
    );

    return response.data;
};

export const uploadProfileImage = async (imageFile) => {
    const formData = new FormData();

    formData.append("profileImage", imageFile);

    const response = await api.post(
        "/users/profile/image",
        formData
    );

    return response.data.data;
};