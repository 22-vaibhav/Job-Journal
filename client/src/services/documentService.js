import api from "./api";

export const getDocuments = async () => {
    const response = await api.get("/documents");
    return response.data;
};

export const uploadDocument = async (formData) => {
    const response = await api.post("/documents", formData);
    return response.data;
};

export const deleteDocument = async (documentId) => {
    const response = await api.delete(
        `/documents/${documentId}`
    );

    return response.data;
};


export const getDocumentDownloadUrl = async (documentId) => {
    const response = await api.get(
        `/documents/${documentId}/download`
    );

    return response.data;
};


export const getDocumentPreviewUrl = async (documentId) => {
    const response = await api.get(
        `/documents/${documentId}/preview`
    );

    return response.data;
};
