const PageContainer = ({ children }) => {
    return (
        <div className="w-full min-w-0 py-2 sm:py-4">
            {children}
        </div>
    );
};

export default PageContainer;