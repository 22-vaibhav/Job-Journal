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
                    className="text-2xl font-semibold tracking-tight text-red-600"
                    style={{ fontFamily: "'Fraunces', serif" }}
                >
                    Danger Zone
                </h2>

                <p className="mt-2 text-slate-500">
                    Permanently delete your JobJournal account and all
                    associated journal data.
                </p>

            </div>


            {/* Delete Account Card */}

            <div className="max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6">

                <div className="flex gap-4">

                    {/* Icon */}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">

                        <AlertTriangle size={20} />

                    </div>


                    {/* Content */}

                    <div className="flex-1">

                        <h3 className="text-lg font-semibold text-red-900">

                            Delete Account

                        </h3>

                        <p className="mt-2 text-sm leading-6 text-red-800">

                            This action is permanent. Deleting your account
                            will permanently remove your profile and all
                            journal entries associated with your account.

                        </p>


                        {/* Confirmation */}

                        <div className="mt-6">

                            <label
                                htmlFor="delete-confirmation"
                                className="block text-sm font-medium text-red-900"
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
                                className="
                                    mt-2
                                    w-full
                                    rounded-xl
                                    border
                                    border-red-300
                                    bg-white
                                    px-4
                                    py-3
                                    text-sm
                                    text-slate-900
                                    outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-red-500
                                    focus:ring-2
                                    focus:ring-red-200
                                    disabled:cursor-not-allowed
                                    disabled:bg-red-50
                                "
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
                            className="
                                mt-5
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-red-600
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-red-700
                                active:bg-red-800
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
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