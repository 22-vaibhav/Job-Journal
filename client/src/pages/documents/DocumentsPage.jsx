import { useEffect, useRef, useState } from "react";
import {
    Search,
    FileText,
    FileImage,
    File,
    FileType,
    X,
    Upload,
    Trash2,
    ExternalLink,
    FolderOpen,
    ShieldCheck,
} from "lucide-react";

import {
    getDocuments,
    uploadDocument,
    deleteDocument,
    getDocumentDownloadUrl,
    getDocumentPreviewUrl,
} from "../../services/documentService";

const categories = [
    "Resume",
    "Cover Letter",
    "Certificate",
    "Offer Letter",
    "Experience Letter",
    "Identity Document",
    "Other",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".png",
    ".jpg",
    ".jpeg",
];

const formatFileSize = (bytes = 0) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getFileType = (document) => {
    const filename = document.originalName || document.name || "";
    const extension = filename.split(".").pop().toLowerCase();

    if (extension === "pdf") return "pdf";

    if (["doc", "docx"].includes(extension)) {
        return "word";
    }

    if (["png", "jpg", "jpeg"].includes(extension)) {
        return "image";
    }

    if (extension === "txt") return "text";

    return "file";
};

const FileTypeIcon = ({ document }) => {
    const type = getFileType(document);

    const iconClasses = {
        pdf: "neu-danger",
        word: "neu-accent",
        image: "neu-warn",
        text: "neu-accent",
        file: "neu-muted",
    };

    const Icon =
        type === "image"
            ? FileImage
            : type === "text"
                ? FileType
                : type === "pdf" || type === "word"
                    ? FileText
                    : File;

    const extension =
        (document.originalName || document.name || "")
            .split(".")
            .pop()
            .toUpperCase();

    return (
        <div
            className={`neu-inset-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClasses[type]}`}
            aria-label={`${extension} file`}
            title={`${extension} file`}
        >
            <Icon size={23} strokeWidth={1.8} />
        </div>
    );
};

const DocumentsPage = () => {
    const fileInputRef = useRef(null);

    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentName, setDocumentName] = useState("");
    const [category, setCategory] = useState("Resume");

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [openingId, setOpeningId] = useState(null);

    const [previewDocument, setPreviewDocument] = useState(null);
    const [previewLoadingId, setPreviewLoadingId] = useState(null);

    const loadDocuments = async () => {
        try {
            setError("");

            const response = await getDocuments();

            if (!response.success) {
                throw new Error(
                    response.message || "Failed to load documents."
                );
            }

            setDocuments(response.documents || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to load documents."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocuments();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        setError("");
        setMessage("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        const extension = file.name
            .slice(file.name.lastIndexOf("."))
            .toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            setError(
                "Unsupported file type. Choose PDF, DOC, DOCX, TXT, PNG, or JPG."
            );
            event.target.value = "";
            setSelectedFile(null);
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError("The maximum allowed file size is 10 MB.");
            event.target.value = "";
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);

        if (!documentName.trim()) {
            setDocumentName(file.name);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError("Please select a file first.");
            return;
        }

        try {
            setUploading(true);
            setError("");
            setMessage("");

            const formData = new FormData();

            formData.append("document", selectedFile);
            formData.append(
                "name",
                documentName.trim() || selectedFile.name
            );
            formData.append("category", category);

            const response = await uploadDocument(formData);

            if (!response.success) {
                throw new Error(
                    response.message || "Failed to upload document."
                );
            }

            setMessage("Document uploaded successfully.");
            setSelectedFile(null);
            setDocumentName("");
            setCategory("Resume");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await loadDocuments();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to upload document."
            );
        } finally {
            setUploading(false);
        }
    };

    const handlePreview = async (document) => {
        try {
            setPreviewLoadingId(document._id);
            setError("");
            setPreviewDocument(null);

            const response = await getDocumentPreviewUrl(document._id);

            if (!response.success || !response.preview?.url) {
                throw new Error("Failed to generate document preview URL.");
            }

            setPreviewDocument({
                ...document,
                previewUrl: response.preview.url,
                previewFormat: response.preview.format,
            });
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to preview document."
            );
        } finally {
            setPreviewLoadingId(null);
        }
    };

    const handleDelete = async (documentId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this document? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            setDeletingId(documentId);
            setError("");
            setMessage("");

            const response = await deleteDocument(documentId);

            if (!response.success) {
                throw new Error(
                    response.message || "Failed to delete document."
                );
            }

            setDocuments((currentDocuments) =>
                currentDocuments.filter(
                    (document) => document._id !== documentId
                )
            );

            setMessage("Document deleted successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to delete document."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleOpen = async (documentId) => {
        const newWindow = window.open("about:blank", "_blank");

        try {
            setOpeningId(documentId);
            setError("");

            const response = await getDocumentDownloadUrl(documentId);

            if (!response.success || !response.url) {
                throw new Error("Failed to generate document download URL.");
            }

            if (newWindow) {
                newWindow.location.href = response.url;
            } else {
                window.location.href = response.url;
            }
        } catch (error) {
            if (newWindow) {
                newWindow.close();
            }

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to open document."
            );
        } finally {
            setOpeningId(null);
        }
    };

    const filteredDocuments = documents.filter((document) => {
        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
            (document.name || "").toLowerCase().includes(query) ||
            (document.originalName || "").toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "All" ||
            document.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
    };

    return (
        <div className="mx-auto w-full max-w-6xl space-y-8">
            {/* Page heading */}
            <header>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] neu-accent">
                    YOUR CAREER WORKSPACE
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight neu-text">
                            Document Vault
                        </h1>

                        <p className="mt-2 max-w-2xl neu-muted">
                            Keep your resumes, certificates, offer letters,
                            and other career documents organized in one place.
                        </p>
                    </div>

                    <div className="neu-raised-sm flex items-center gap-2 rounded-2xl px-4 py-3 text-sm neu-muted">
                        <ShieldCheck size={18} className="neu-accent" />
                        <span>Career documents</span>
                    </div>
                </div>
            </header>

            {/* Feedback messages */}
            {error && (
                <div
                    role="alert"
                    className="neu-inset flex items-start justify-between gap-3 rounded-2xl p-4 text-sm neu-danger"
                >
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => setError("")}
                        aria-label="Dismiss error"
                        className="neu-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {message && (
                <div
                    role="status"
                    className="neu-inset flex items-start justify-between gap-3 rounded-2xl p-4 text-sm neu-accent"
                >
                    <p>{message}</p>

                    <button
                        type="button"
                        onClick={() => setMessage("")}
                        aria-label="Dismiss message"
                        className="neu-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Upload section */}
            <section className="neu-inset rounded-[2rem] p-5 sm:p-7">
                <div className="mb-6 flex items-start gap-3">
                    <div className="neu-raised-sm flex h-12 w-12 shrink-0 items-center justify-center rounded-full neu-accent">
                        <Upload size={21} />
                    </div>

                    <div>
                        <h2 className="font-display text-xl font-semibold neu-text">
                            Upload a document
                        </h2>

                        <p className="mt-1 text-sm neu-muted">
                            PDF, DOC, DOCX, TXT, PNG, and JPG files up to 10 MB.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleUpload} className="space-y-5">
                    <div>
                        <label
                            htmlFor="documentFile"
                            className="mb-2 block text-sm font-medium neu-text"
                        >
                            Choose file
                        </label>

                        <input
                            ref={fileInputRef}
                            id="documentFile"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                            className="neu-input block w-full p-3 text-sm file:mr-4 file:min-h-11 file:cursor-pointer file:rounded-xl file:border-0 file:bg-transparent file:px-4 file:py-2 file:font-semibold file:text-[var(--neu-accent)]"
                        />

                        {selectedFile && (
                            <p className="mt-2 break-words text-sm neu-muted">
                                Selected: {selectedFile.name} (
                                {formatFileSize(selectedFile.size)})
                            </p>
                        )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="documentName"
                                className="mb-2 block text-sm font-medium neu-text"
                            >
                                Display name
                            </label>

                            <input
                                id="documentName"
                                type="text"
                                value={documentName}
                                onChange={(event) =>
                                    setDocumentName(event.target.value)
                                }
                                maxLength={150}
                                placeholder="e.g. Software Engineer Resume"
                                className="neu-input h-12 w-full px-4 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="documentCategory"
                                className="mb-2 block text-sm font-medium neu-text"
                            >
                                Category
                            </label>

                            <select
                                id="documentCategory"
                                value={category}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                                className="neu-input h-12 w-full px-4 py-3 text-sm"
                            >
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedFile || uploading}
                        className="neu-btn neu-btn-accent inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm sm:w-auto"
                    >
                        <Upload size={17} />
                        {uploading ? "Uploading..." : "Upload document"}
                    </button>
                </form>
            </section>

            {/* Document list */}
            <section>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-xl font-semibold neu-text">
                            Your documents
                        </h2>

                        <p className="mt-1 text-sm neu-muted">
                            {loading
                                ? "Loading documents..."
                                : `${filteredDocuments.length} ${filteredDocuments.length === 1
                                    ? "document"
                                    : "documents"
                                } found`}
                        </p>
                    </div>

                    {(searchQuery || selectedCategory !== "All") && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="neu-btn neu-btn-accent h-11 rounded-xl px-4 text-sm"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Search and category filter */}
                <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 neu-muted"
                        />

                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search by document name..."
                            aria-label="Search documents"
                            className="neu-input h-12 w-full py-3 pl-10 pr-12 text-sm"
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full neu-muted"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(event) =>
                            setSelectedCategory(event.target.value)
                        }
                        aria-label="Filter documents by category"
                        className="neu-input h-12 px-4 py-3 text-sm"
                    >
                        <option value="All">All categories</option>

                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="neu-inset rounded-[1.75rem] p-8 text-center neu-muted">
                        Loading your documents...
                    </div>
                ) : documents.length === 0 ? (
                    <div className="neu-inset rounded-[1.75rem] px-6 py-12 text-center">
                        <FolderOpen
                            size={34}
                            className="mx-auto neu-muted"
                        />

                        <h3 className="font-display mt-3 text-lg font-semibold neu-text">
                            No documents yet
                        </h3>

                        <p className="mt-2 text-sm neu-muted">
                            Upload your first career document to get started.
                        </p>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <div className="neu-inset rounded-[1.75rem] px-6 py-12 text-center">
                        <Search
                            size={30}
                            className="mx-auto neu-muted"
                        />

                        <h3 className="font-display mt-3 text-lg font-semibold neu-text">
                            No matching documents
                        </h3>

                        <p className="mt-2 text-sm neu-muted">
                            Try another search term or category.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="neu-btn neu-btn-accent mt-4 h-11 rounded-xl px-4 text-sm"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredDocuments.map((document) => (
                            <article
                                key={document._id}
                                className="neu-card flex min-w-0 flex-col p-5 sm:p-6"
                            >
                                <div className="mb-4 flex items-start gap-3">
                                    <FileTypeIcon document={document} />

                                    <div className="min-w-0 flex-1">
                                        <span className="neu-chip neu-accent inline-block max-w-full truncate px-3 py-1 text-xs font-semibold">
                                            {document.category}
                                        </span>

                                        <h3
                                            className="mt-2 break-words font-semibold neu-text"
                                            title={document.name}
                                        >
                                            {document.name}
                                        </h3>
                                    </div>
                                </div>

                                <p
                                    className="break-words text-sm neu-muted"
                                    title={document.originalName}
                                >
                                    {document.originalName}
                                </p>

                                <div className="mt-4 space-y-1.5 text-xs neu-muted">
                                    <p>
                                        Size: {formatFileSize(document.size)}
                                    </p>

                                    <p>
                                        Added: {formatDate(document.createdAt)}
                                    </p>
                                </div>

                                <div className="mt-auto flex flex-wrap gap-3 pt-5">

                                    <button
                                        type="button"
                                        onClick={() => handlePreview(document)}
                                        disabled={previewLoadingId === document._id}
                                        className="neu-btn neu-btn-accent inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm"
                                    >
                                        {previewLoadingId === document._id
                                            ? "Previewing....."
                                            : "Preview"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleOpen(document._id)}
                                        disabled={openingId === document._id}
                                        className="neu-btn inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm"
                                    >
                                        {openingId === document._id ? "Opening..." : "Open"}
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(document._id)
                                        }
                                        disabled={deletingId === document._id}
                                        aria-label={`Delete ${document.name}`}
                                        className="neu-btn neu-btn-danger inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm"
                                    >
                                        <Trash2 size={15} />
                                        {deletingId === document._id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {previewDocument && (
                <div className="neu-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="neu-card flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4">
                            <div className="min-w-0">
                                <h2 className="font-display truncate text-lg font-semibold neu-text">
                                    {previewDocument.name}
                                </h2>
                                <p className="text-sm neu-muted">
                                    {previewDocument.originalName}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPreviewDocument(null)}
                                className="neu-btn ml-4 h-11 rounded-xl px-4"
                                aria-label="Close preview"
                            >
                                Close
                            </button>
                        </div>

                        <div className="neu-inset m-4 flex-1 overflow-auto rounded-2xl p-4">
                            {["pdf"].includes(
                                (previewDocument.previewFormat || "").toLowerCase()
                            ) ? (
                                <iframe
                                    src={previewDocument.previewUrl}
                                    title={previewDocument.name}
                                    className="h-full min-h-[60vh] w-full rounded-xl bg-white"
                                />
                            ) : ["png", "jpg", "jpeg", "webp", "gif"].includes(
                                (previewDocument.previewFormat || "").toLowerCase()
                            ) ? (
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src={previewDocument.previewUrl}
                                        alt={previewDocument.name}
                                        className="max-h-full max-w-full rounded-xl object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                                    <p className="font-medium neu-text">
                                        Preview is not available for this file type.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => handleOpen(previewDocument._id)}
                                        className="neu-btn neu-btn-accent h-11 rounded-xl px-5"
                                    >
                                        Download document
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DocumentsPage;