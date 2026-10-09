const {
    uploadDocument: uploadDocumentService,
    getUserDocuments,
    deleteDocument: deleteDocumentService,
    getDocumentDownloadUrl: getDocumentDownloadUrlService,
    getDocumentPreviewUrl: getDocumentPreviewUrlService,
} = require("../services/documentService");

const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please select a document to upload.",
            });
        }

        const document = await uploadDocumentService(
            req.user.userId,
            req.file,
            {
                name: req.body.name,
                category: req.body.category,
            }
        );

        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully.",
            document,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to upload document.",
        });
    }
};

const getDocuments = async (req, res) => {
    try {
        const documents = await getUserDocuments(req.user.userId);

        return res.status(200).json({
            success: true,
            documents,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch documents.",
        });
    }
};

const getDocumentDownloadUrl = async (req, res) => {
    try {
        const url = await getDocumentDownloadUrlService(
            req.user.userId,
            req.params.documentId
        );

        return res.status(200).json({
            success: true,
            url,
        });
    } catch (error) {
        if (error.message === "Document not found.") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Get document download URL error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate document download URL.",
        });
    }
};


const getDocumentPreviewUrl = async (req, res) => {
    try {
        const preview = await getDocumentPreviewUrlService(
            req.user.userId,
            req.params.documentId
        );

        return res.status(200).json({
            success: true,
            preview,
        });
    } catch (error) {
        if (error.message === "Document not found.") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Get document preview URL error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate document preview URL.",
        });
    }
};


const deleteDocument = async (req, res) => {
    try {
        await deleteDocumentService(
            req.user.userId,
            req.params.documentId
        );

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully.",
        });
    } catch (error) {
        const statusCode = error.message === "Document not found." ? 404 : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message || "Failed to delete document.",
        });
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument,
    getDocumentDownloadUrl,
    getDocumentPreviewUrl,
};
