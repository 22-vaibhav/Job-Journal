const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-center gap-3 mb-7">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl neu-inset-sm neu-accent shrink-0">
            {icon}
        </div>
        <div>
            <h2
                className="font-display text-xl font-medium neu-text tracking-tight leading-none"
            >
                {title}
            </h2>
            <p className="mt-1 text-xs neu-muted">{subtitle}</p>
        </div>
    </div>
);

const FieldLabel = ({ icon, children }) => (
    <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider neu-muted">
        <span className="neu-muted">{icon}</span>
        {children}
    </label>
);

const fieldInputClasses =
    "neu-input w-full mt-1.5 h-12 px-4 py-3";

const icons = {
    building: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    briefcase: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="7" width="18" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    chart: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18M8 17V10M13 17V6M18 17v-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    target: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="0.5" fill="currentColor" />
        </svg>
    ),
    user: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
        </svg>
    ),
    mail: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    calendar: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 11h18" strokeLinecap="round" />
        </svg>
    ),
    briefcaseHeader: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="7" width="18" height="13" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    userHeader: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
        </svg>
    ),
};

const Field = ({ icon, label, isEditing, name, value, onChange, type = "text", fallback = "—" }) => (
    <div>
        <FieldLabel icon={icon}>{label}</FieldLabel>

        {
            isEditing ? (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={fieldInputClasses}
                />
            ) : (
                <p className="mt-1.5 font-medium neu-text">
                    {value || <span className="neu-muted font-normal">{fallback}</span>}
                </p>
            )
        }
    </div>
);

const UserInfoCard = ({
    user,
    setUser,
    isEditing,
}) => {

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

            {/* Personal Information */}
            <div className="relative neu-card p-6 sm:p-8 overflow-hidden">
                <SectionHeader
                    icon={icons.userHeader}
                    title="Personal"
                    subtitle="Identity & account info"
                />

                <div className="space-y-6">
                    <Field
                        icon={icons.user}
                        label="Full Name"
                        isEditing={isEditing}
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />

                    <Field
                        icon={icons.mail}
                        label="Email"
                        isEditing={isEditing}
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />

                    <div>
                        <FieldLabel icon={icons.calendar}>Member Since</FieldLabel>
                        <p className="mt-1.5 font-medium neu-text">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* Professional Information */}
            <div className="relative neu-card p-6 sm:p-8 overflow-hidden">
                <SectionHeader
                    icon={icons.briefcaseHeader}
                    title="Professional"
                    subtitle="Career details & goals"
                />

                <div className="space-y-6">
                    <Field
                        icon={icons.building}
                        label="Current Company"
                        isEditing={isEditing}
                        name="currentCompany"
                        value={user.currentCompany}
                        onChange={handleChange}
                        fallback="Not set"
                    />

                    <Field
                        icon={icons.briefcase}
                        label="Current Role"
                        isEditing={isEditing}
                        name="currentRole"
                        value={user.currentRole}
                        onChange={handleChange}
                        fallback="Not set"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <FieldLabel icon={icons.chart}>Experience</FieldLabel>
                            {
                                isEditing ? (
                                    <input
                                        type="number"
                                        name="experience"
                                        value={user.experience}
                                        onChange={handleChange}
                                        className={fieldInputClasses}
                                    />
                                ) : (
                                    <p className="mt-1.5 font-medium neu-text">
                                        {user.experience} Years
                                    </p>
                                )
                            }
                        </div>

                        <Field
                            icon={icons.target}
                            label="Career Goal"
                            isEditing={isEditing}
                            name="careerGoal"
                            value={user.careerGoal}
                            onChange={handleChange}
                            fallback="Not set"
                        />
                    </div>
                </div>
            </div>

        </div>
    );

};

export default UserInfoCard;