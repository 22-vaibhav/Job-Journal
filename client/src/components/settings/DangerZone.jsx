import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { deleteAccount } from "../../services/settingsService";
import { removeToken } from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../constants/routes";

const DangerZone = () => {
    const navigate = useNavigate();

    const { setUser } = useAuth();

    const [confirmation, setConfirmation] = useState("");

    const [loading, setLoading] = useState(false);

    const handleDeleteAccount = async () => {

        if (confirmation !== "DELETE") {
            toast.error("Please type DELETE to confirm.");
            return;
        }

        try {
            setLoading(true);

            await deleteAccount(confirmation);

            // Remove authentication
            removeToken();

            // Clear user from AuthContext
            setUser(null);

            toast.success("Your account has been deleted.");

            navigate(ROUTES.LOGIN);

        } catch (error) {

            console.error("Delete account error:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete account."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>

                <h2
                    className="font-display text-2xl font-medium tracking-tight neu-danger"
                >
                    Danger Zone
                </h2>

                <p className="mt-2 neu-muted">
                    Permanently delete your JobJournal account and all
                    associated journal data.
                </p>

            </div>


            {/* Delete Account Card */}

            <div className="neu-inset max-w-2xl rounded-3xl p-6">

                <div className="flex gap-4">

                    {/* Icon */}

                    <div className="neu-raised-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-full neu-danger">

                        <AlertTriangle size={20} />

                    </div>


                    {/* Content */}

                    <div className="flex-1">

                        <h3 className="text-lg font-semibold neu-text">

                            Delete Account

                        </h3>

                        <p className="mt-2 text-sm leading-6 neu-muted">

                            This action is permanent. Deleting your account
                            will permanently remove your profile and all
                            journal entries associated with your account.

                        </p>


                        {/* Confirmation */}

                        <div className="mt-6">

                            <label
                                htmlFor="delete-confirmation"
                                className="block text-sm font-medium neu-text"
                            >
                                Type <span className="font-bold">DELETE</span>{" "}
                                to confirm.
                            </label>

                            <input
                                id="delete-confirmation"
                                type="text"
                                value={confirmation}
                                onChange={(e) =>
                                    setConfirmation(e.target.value)
                                }
                                placeholder="DELETE"
                                disabled={loading}
                                className="neu-input mt-2 h-12 w-full px-4 py-3 text-sm transition"
                            />

                        </div>


                        {/* Delete Button */}

                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={
                                loading ||
                                confirmation !== "DELETE"
                            }
                            className="neu-btn neu-btn-danger mt-5 inline-flex h-12 items-center gap-2 px-6 py-3 text-sm"
                        >

                            <Trash2 size={17} />

                            {loading
                                ? "Deleting Account..."
                                : "Delete Account"}

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DangerZone;