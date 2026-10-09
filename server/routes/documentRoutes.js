const express = require("express");

const {
    uploadDocument,
    getDocuments,
    getDocumentDownloadUrl,
    getDocumentPreviewUrl,
    deleteDocument,
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/documentUploadMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    upload.single("document"),
    uploadDocument
);

router.get("/", protect, getDocuments);

router.get(
    "/:documentId/download",
    protect,
    getDocumentDownloadUrl
);

router.get(
    "/:documentId/preview",
    protect,
    getDocumentPreviewUrl
);

router.delete("/:documentId", protect, deleteDocument);

module.exports = router;
