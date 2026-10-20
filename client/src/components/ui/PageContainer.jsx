const PageContainer = ({ children }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
        </div>
    );
};

export default PageContainer;