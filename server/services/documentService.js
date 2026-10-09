const Document = require("../models/Document");
const cloudinary = require("../config/cloudinary");


const path = require("path");


const uploadDocument = async (userId, file, data) => {

    const extension = path.extname(file.originalname).toLowerCase();

    const resourceType = [".png", ".jpg", ".jpeg"].includes(extension)
        ? "image"
        : "raw";

    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "jobjournal/documents",
                resource_type: resourceType,
                type: "authenticated",
                use_filename: true,
                unique_filename: true,
                filename_override: file.originalname,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(file.buffer);
    });

    try {
        const document = await Document.create({
            user: userId,
            name: data.name || file.originalname,
            originalName: file.originalname,
            category: data.category || "Other",
            cloudinaryUrl: result.secure_url,
            cloudinaryPublicId: result.public_id,
            resourceType: result.resource_type,
            format: result.format || "",
            size: file.size,
        });

        return document;
    } catch (error) {
        // Avoid leaving an orphaned file if MongoDB saving fails.
        await cloudinary.uploader.destroy(result.public_id, {
            resource_type: result.resource_type,
        }).catch(() => { });

        throw error;
    }
};

const getUserDocuments = async (userId) => {
    return Document.find({ user: userId }).sort({ createdAt: -1 });
};


const getDocumentDownloadUrl = async (userId, documentId) => {
    const document = await Document.findOne({
        _id: documentId,
        user: userId,
    });

    if (!document) {
        throw new Error("Document not found.");
    }

    const extension =
        document.format ||
        path.extname(document.originalName).slice(1);

    const expiresAt = Math.floor(Date.now() / 1000) + 60;

    const url = cloudinary.utils.private_download_url(
        document.cloudinaryPublicId,
        extension,
        {
            resource_type: document.resourceType,
            type: "authenticated",
            expires_at: expiresAt,
        }
    );

    return url;
};


const deleteDocument = async (userId, documentId) => {
    const document = await Document.findOne({
        _id: documentId,
        user: userId,
    });

    if (!document) {
        throw new Error("Document not found.");
    }

    const result = await cloudinary.uploader.destroy(
        document.cloudinaryPublicId,
        {
            resource_type: document.resourceType,
            type: "authenticated",
        }
    );

    if (result.result !== "ok" && result.result !== "not found") {
        throw new Error("Failed to delete document from Cloudinary.");
    }

    await document.deleteOne();

    return document;
};


const getDocumentPreviewDetails = async (userId, documentId) => {
    const document = await Document.findOne({
        _id: documentId,
        user: userId,
    });

    if (!document) {
        throw new Error("Document not found.");
    }

    return {
        documentId: document._id,
        name: document.name,
        originalName: document.originalName,
        cloudinaryPublicId: document.cloudinaryPublicId,
        resourceType: document.resourceType,
        format: document.format,
    };
};


const getDocumentPreviewUrl = async (userId, documentId) => {
    const document = await Document.findOne({
        _id: documentId,
        user: userId,
    });

    if (!document) {
        throw new Error("Document not found.");
    }

    const extension =
        document.format ||
        path.extname(document.originalName).slice(1);

    const url = cloudinary.url(document.cloudinaryPublicId, {
        resource_type: document.resourceType,
        type: "authenticated",
        // format: extension,
        sign_url: true,
        secure: true,
    });

    return {
        url,
        format: extension.toLowerCase(),
        resourceType: document.resourceType,
        originalName: document.originalName,
    };
};



module.exports = {
    uploadDocument,
    getUserDocuments,
    deleteDocument,
    getDocumentDownloadUrl,
    getDocumentPreviewDetails,
    getDocumentPreviewUrl,
};
