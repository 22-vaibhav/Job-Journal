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
        pdf: "bg-red-50 text-red-600",
        word: "bg-blue-50 text-blue-600",
        image: "bg-purple-50 text-purple-600",
        text: "bg-emerald-50 text-emerald-600",
        file: "bg-gray-100 text-gray-600",
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
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClasses[type]}`}
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
        <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Page heading */}
            <header>
                <p className="text-sm font-semibold tracking-wide text-indigo-600">
                    YOUR CAREER WORKSPACE
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Document Vault
                        </h1>

                        <p className="mt-2 max-w-2xl text-gray-600">
                            Keep your resumes, certificates, offer letters,
                            and other career documents organized in one place.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
                        <ShieldCheck size={18} className="text-indigo-600" />
                        <span>Career documents</span>
                    </div>
                </div>
            </header>

            {/* Feedback messages */}
            {error && (
                <div
                    role="alert"
                    className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => setError("")}
                        aria-label="Dismiss error"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {message && (
                <div
                    role="status"
                    className="flex items-start justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
                >
                    <p>{message}</p>

                    <button
                        type="button"
                        onClick={() => setMessage("")}
                        aria-label="Dismiss message"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Upload section */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Upload size={21} />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Upload a document
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            PDF, DOC, DOCX, TXT, PNG, and JPG files up to 10 MB.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleUpload} className="space-y-5">
                    <div>
                        <label
                            htmlFor="documentFile"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Choose file
                        </label>

                        <input
                            ref={fileInputRef}
                            id="documentFile"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                            className="block w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                        />

                        {selectedFile && (
                            <p className="mt-2 break-words text-sm text-gray-500">
                                Selected: {selectedFile.name} (
                                {formatFileSize(selectedFile.size)})
                            </p>
                        )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="documentName"
                                className="mb-2 block text-sm font-medium text-gray-700"
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="documentCategory"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>

                            <select
                                id="documentCategory"
                                value={category}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                        <h2 className="text-xl font-semibold text-gray-900">
                            Your documents
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
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
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
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
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search by document name..."
                            aria-label="Search documents"
                            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
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
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                        Loading your documents...
                    </div>
                ) : documents.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                        <FolderOpen
                            size={34}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-3 text-lg font-semibold text-gray-800">
                            No documents yet
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Upload your first career document to get started.
                        </p>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                        <Search
                            size={30}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="mt-3 text-lg font-semibold text-gray-800">
                            No matching documents
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Try another search term or category.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredDocuments.map((document) => (
                            <article
                                key={document._id}
                                className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
                            >
                                <div className="mb-4 flex items-start gap-3">
                                    <FileTypeIcon document={document} />

                                    <div className="min-w-0 flex-1">
                                        <span className="inline-block max-w-full truncate rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                            {document.category}
                                        </span>

                                        <h3
                                            className="mt-2 break-words font-semibold text-gray-900"
                                            title={document.name}
                                        >
                                            {document.name}
                                        </h3>
                                    </div>
                                </div>

                                <p
                                    className="break-words text-sm text-gray-500"
                                    title={document.originalName}
                                >
                                    {document.originalName}
                                </p>

                                <div className="mt-4 space-y-1.5 text-xs text-gray-500">
                                    <p>
                                        Size: {formatFileSize(document.size)}
                                    </p>

                                    <p>
                                        Added: {formatDate(document.createdAt)}
                                    </p>
                                </div>

                                <div className="mt-auto flex gap-3 pt-5">

                                    <button
                                        type="button"
                                        onClick={() => handlePreview(document)}
                                        disabled={previewLoadingId === document._id}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {previewLoadingId === document._id
                                            ? "Previewing....."
                                            : "Preview"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleOpen(document._id)}
                                        disabled={openingId === document._id}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
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
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b px-5 py-4">
                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-semibold text-gray-900">
                                    {previewDocument.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {previewDocument.originalName}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setPreviewDocument(null)}
                                className="ml-4 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
                                aria-label="Close preview"
                            >
                                Close
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto bg-gray-100 p-4">
                            {["pdf"].includes(
                                (previewDocument.previewFormat || "").toLowerCase()
                            ) ? (
                                <iframe
                                    src={previewDocument.previewUrl}
                                    title={previewDocument.name}
                                    className="h-full min-h-[60vh] w-full rounded-lg bg-white"
                                />
                            ) : ["png", "jpg", "jpeg", "webp", "gif"].includes(
                                (previewDocument.previewFormat || "").toLowerCase()
                            ) ? (
                                <div className="flex h-full items-center justify-center">
                                    <img
                                        src={previewDocument.previewUrl}
                                        alt={previewDocument.name}
                                        className="max-h-full max-w-full rounded-lg object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                                    <p className="font-medium text-gray-700">
                                        Preview is not available for this file type.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => handleOpen(previewDocument._id)}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
