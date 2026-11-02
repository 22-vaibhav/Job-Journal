import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
    return (
        <div className="neu-ground min-h-screen lg:flex lg:items-start lg:gap-8 lg:p-7">
            <Sidebar />

            <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-0 lg:py-3">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;